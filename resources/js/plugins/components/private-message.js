// @ts-check

import axios from 'axios'
import Mark from 'mark.js'
import privateMessage from '../data/private-message'

const INTERVAL_IN_SECONDS_TO_MARK_MESSAGES_AS_READ = 3

/**
 * @returns {import('../@types').Components.PrivateMessageComponent}
 */
export default () => {
  /** @type {HTMLDivElement} */
  const component = document.querySelector('.private-message__container--main')
  const urlTemplate = component.getAttribute('data-url')
  const urlBatchRequest = component.getAttribute('data-batch-request-url')
  const userId = Number(component.getAttribute('data-user-id'))
  const echo = window.Echo.join(`basement.contacts.${userId}`)
  const highlighter = new Mark('.private-message__text--value')

  return {
    isInfoBoxOpened: false,
    isLoading: true,
    isLoadingShowMore: false,
    isLoadingSentMessage: false,
    isSearchOpened: false,
    messageIdWithOpenDialog: null,
    messages: [],
    unreadMessageCursor: null,
    newMessageValue: '',
    receiver: null,
    searchKeyword: '',
    selectedMessage: null,
    seenMessages: [],
    url: '',
    urlTemplate,
    urlBatchRequest,
    urlShowMore: null,

    /**
     * Hook during the initialization phase of the current Alpine component.
     */
    init() {
      this.$refs.basementChatBox.addEventListener('update-receiver', this.updateReceiver.bind(this))

      setInterval(this.markSeenMessagesAsRead.bind(this), INTERVAL_IN_SECONDS_TO_MARK_MESSAGES_AS_READ * 1000)

      this.$watch('messages', () => {
        if (this.searchKeyword.trim() === '') {
          highlighter.unmark()
        } else {
          highlighter.mark(this.searchKeyword.trim())
        }
      })

      this.registerEchoEventListeners()
    },

    /**
     * Load initial component data.
     */
    async mount() {
      this.isLoading = true

      /** @type import('../@types').Api.GetAllPrivateMessagesResult */
      const response = await axios.get(this.url, {
        params: {
          keyword: this.searchKeyword.trim(),
        },
      }).then(({ data }) => data)

      this.urlShowMore = response.links.next
      this.messages = response.data.map((value) => privateMessage(value))
      this.isLoading = false

      if (this.messages.length > 0) {
        this.setUnreadMessagesMarker()
        this.scrollTo(this.unreadMessageCursor, {
          block: 'center',
        })
      }
    },

    /**
     * Load more component data.
     */
    async mountMore() {
      if (this.urlShowMore === null) {
        return
      }

      this.isLoadingShowMore = true

      /** @type import('../@types').Api.GetAllPrivateMessagesResult */
      const response = await axios.get(this.urlShowMore, {
        params: {
          keyword: this.searchKeyword.trim(),
        },
      }).then(({ data }) => data)
      const messages = response.data.map((value) => privateMessage(value))
      const currentCursor = this.messages.at(-1)

      this.messages.push(...messages)
      this.urlShowMore = response.links.next
      this.isLoadingShowMore = false
      this.scrollTo(currentCursor.id)
    },

    /**
     * Get messages grouped by day of creation.
     */
    get groupedMessages() {
      const group = [...this.messages].reverse().reduce((
        /** @type Map<string, import('../@types').Data.PrivateMessage[]> */ carry,
        value,
      ) => {
        const date = value.createdAt.format('LL')

        if (carry.has(date) === false) {
          carry.set(date, [])
        }

        carry.get(date).push(value)

        return carry
      }, new Map())

      return [...group.values()]
    },

    /**
     * Update messages that have been seen to the database.
     */
    markSeenMessagesAsRead() {
      if (this.seenMessages.length === 0) {
        return
      }

      axios.patch(this.urlBatchRequest, this.seenMessages.map((value) => ({
        operation: 'mark as read',
        value: { id: value },
      })))

      this.receiver.unreadMessages -= this.seenMessages.length

      this.seenMessages = []
    },

    /**
     * Send a new message.
     */
    async sendNewMessage() {
      this.isLoadingSentMessage = true

      /** @type import('../@types').Api.SendPrivateMessageResult */
      const response = await axios.post(this.url, { value: this.newMessageValue }).then(({ data }) => data)
      const message = privateMessage(response.data)

      if (this.receiver.id !== userId) {
        this.messages.unshift(message)
        this.scrollTo(message.id, {
          behavior: 'smooth',
        })
      }

      this.receiver.lastPrivateMessage = message
      this.newMessageValue = ''
      this.isLoadingSentMessage = false
    },

    /**
     * Laravel Echo event listener when a message is received.
     */
    onMessageReceived(event) {
      const receivedMessage = privateMessage(event.detail)

      if (event.detail.sender_id === this.receiver?.id && event.detail.value.includes(this.searchKeyword.trim())) {
        this.messages.unshift(receivedMessage)
      }

      this.$dispatch('update-last-private-message', receivedMessage)

      if (userId !== event.detail.sender_id) {
        this.$dispatch('send-push-notification', {
          title: event.detail.sender.name,
          body: event.detail.value,
          icon: event.detail.sender.avatar,
        })
      }
    },

    /**
     * Laravel Echo event listener when a message is marked as read.
     */
    onMessageMarkedAsRead(event) {
      if (this.receiver?.id === event.detail.receiver.id) {
        event.detail.messages.forEach((value) => {
          const sameMessage = this.messages.find(({ id }) => id === value.id)
          sameMessage.rawReadAt = value.read_at
        })
      }
    },

    /**
     * Register Laravel Echo event listeners.
     */
    registerEchoEventListeners() {
      echo
        .listen('.basement.message.sent', this.onMessageReceived.bind(this))
        .listen('.basement.message.marked-as-read', this.onMessageMarkedAsRead.bind(this))
    },

    /**
     * Scroll component view to given message id.
     */
    scrollTo(id, options = {}) {
      if (id === null) {
        return
      }

      this.$nextTick(() => {
        document.querySelector(`.private-message__text--value[data-id="${id}"]`).scrollIntoView(options)
      })
    },

    /**
     * Add unread messages marker to the component.
     */
    setUnreadMessagesMarker() {
      this.messages.some((message) => {
        if (message.readAt !== null) {
          return true
        }

        if (message.senderId === this.receiver.id) {
          this.unreadMessageCursor = message.id
        }

        return false
      })
    },

    /**
     * HTML DOM event listener to update the current receiver.
     */
    updateReceiver(/** @type import('../@types').Events.UpdateReceiverEvent */ event) {
      this.unreadMessageCursor = null
      this.searchKeyword = ''
      this.receiver = event.detail
      this.url = this.urlTemplate.replace(':contact', String(this.receiver.id))
      this.mount()
    },
  }
}
