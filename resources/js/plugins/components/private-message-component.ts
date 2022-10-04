import Mark from 'mark.js'
import PrivateMessageData from '../data/private-message-data'
import type * as Alpine from '../types/alpine'
import type { Response, PaginatedResponse, PrivateMessage } from '../types/api'
import type { PrivateMessageComponent, PrivateMessageComponentData } from '../types/components'
import type { PrivateMessageMarkedAsReadEvent, PrivateMessageSentEvent, UpdateReceiverEvent } from '../types/events'

export default (): Alpine.Component & PrivateMessageComponent => {
  const intervalInSecondsToMarkMessagesAsRead = 3
  const container = document.querySelector('.private-message__container--main')!
  const urlTemplate = container.getAttribute('data-url') as string
  const urlBatchRequest = container.getAttribute('data-batch-request-url') as string
  const userId = Number(container.getAttribute('data-user-id') as string)
  const highlighter = new Mark('.private-message__text--value')

  return {
    isInfoBoxOpened: false,
    isLoading: true,
    isLoadingShowMore: false,
    isLoadingSentMessage: false,
    isSearchOpened: false,
    messageIdWithOpenDialog: null,
    messages: [],
    newMessageValue: '',
    receiver: null,
    searchKeyword: '',
    selectedMessage: null,
    seenMessages: [],
    unreadMessageCursor: null,
    url: '',
    urlTemplate,
    urlBatchRequest,
    urlShowMore: null,

    /**
     * Hook during the initialization phase of the current Alpine component.
     */
    init(): void {
      (this.$refs as Alpine.Refs).basementChatBox.addEventListener('update-receiver', this.updateReceiver.bind(this))

      setInterval(
        this.markSeenMessagesAsRead.bind(this),
        intervalInSecondsToMarkMessagesAsRead * 1000,
      );

      (this.$watch as Alpine.Watch<PrivateMessageComponentData>)('messages', () => {
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
    async mount(): Promise<void> {
      this.isLoading = true

      const response = await window.axios
        .get(this.url, { params: { keyword: this.searchKeyword.trim() } })
        .then(({ data }) => data) as PaginatedResponse<PrivateMessage[]>

      this.urlShowMore = response.links.next
      this.messages = response.data.map((message) => PrivateMessageData.from(message))
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
    async mountMore(): Promise<void> {
      if (this.urlShowMore === null) {
        throw new Error('Next page to load more private messages is not available')
      }

      this.isLoadingShowMore = true

      const response = await window.axios
        .get(this.urlShowMore, { params: { keyword: this.searchKeyword.trim() } })
        .then(({ data }) => data) as PaginatedResponse<PrivateMessage[]>

      const messages = response.data.map((message) => PrivateMessageData.from(message))
      const currentCursor = this.messages.at(-1)

      this.messages.push(...messages)
      this.urlShowMore = response.links.next
      this.isLoadingShowMore = false

      if (currentCursor !== undefined) {
        this.scrollTo(currentCursor.id)
      }
    },

    /**
     * Get messages grouped by day of creation.
     */
    get groupedMessages(): PrivateMessageData[][] {
      const messages = new Map<string, PrivateMessageData[]>()

      Array.from(this.messages).reverse().forEach((message) => {
        const date = message.createdAtDate

        if (messages.has(date) === false) {
          messages.set(date, [])
        }

        messages.get(date)!.push(message)
      })

      return [...messages.values()]
    },

    /**
     * Send a new message.
     */
    async sendNewMessage(): Promise<void> {
      if (this.receiver === null) {
        throw new Error('Receiver cannot be empty')
      }

      this.isLoadingSentMessage = true

      const response = await window.axios
        .post(this.url, { value: this.newMessageValue })
        .then(({ data }) => data) as Response<PrivateMessage>
      const message = PrivateMessageData.from(response.data)

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
     * Update messages that have been seen to the database.
     */
    markSeenMessagesAsRead(): void {
      if (this.seenMessages.length === 0) {
        return
      }

      if (this.receiver === null) {
        throw new Error('Receiver cannot be empty')
      }

      window.axios.patch(this.urlBatchRequest, this.seenMessages.map((value) => ({
        operation: 'mark as read',
        value: { id: value },
      })))

      this.receiver.unreadMessages -= this.seenMessages.length

      this.seenMessages = []
    },

    /**
     * Laravel Echo event listener when a message is received.
     */
    onMessageReceived(event: CustomEvent<PrivateMessageSentEvent>): void {
      const receivedMessage = PrivateMessageData.from(event.detail)

      if (
        event.detail.sender_id === this.receiver?.id
        && event.detail.value.includes(this.searchKeyword.trim())
      ) {
        this.messages.unshift(receivedMessage)
      }

      (this.$dispatch as Alpine.Dispatch)('update-last-private-message', receivedMessage)

      if (userId !== event.detail.sender_id) {
        (this.$dispatch as Alpine.Dispatch)('send-push-notification', {
          title: event.detail.sender.name,
          body: event.detail.value,
          icon: event.detail.sender.avatar,
        })
      }
    },

    /**
     * Laravel Echo event listener when a message is marked as read.
     */
    onMessageMarkedAsRead(event: CustomEvent<PrivateMessageMarkedAsReadEvent>): void {
      if (this.receiver?.id === event.detail.receiver.id) {
        event.detail.messages.forEach((value) => {
          const sameMessage = this.messages.find(({ id }) => id === value.id)

          if (sameMessage !== undefined) {
            sameMessage.readAtTime = value.read_at
          }
        })
      }
    },

    /**
     * Register Laravel Echo event listeners.
     */
    registerEchoEventListeners(): void {
      window.Echo.join(`basement.contacts.${userId}`)
        .listen('.basement.message.sent', this.onMessageReceived.bind(this))
        .listen('.basement.message.marked-as-read', this.onMessageMarkedAsRead.bind(this))
    },

    /**
     * Scroll component view to given message id.
     */
    scrollTo(id: number | null, options: ScrollIntoViewOptions = {}): void {
      if (id === null) {
        return
      }

      (this.$nextTick as Alpine.NextTick)(() => {
        document.querySelector(`.private-message__text--value[data-id="${id}"]`)?.scrollIntoView(options)
      })
    },

    /**
     * Add unread messages marker to the component.
     */
    setUnreadMessagesMarker(): void {
      this.messages.some((message) => {
        if (message.readAt !== null) {
          return true
        }

        if (message.senderId === this.receiver?.id) {
          this.unreadMessageCursor = message.id
        }

        return false
      })
    },

    /**
     * HTML DOM event listener to update the current receiver.
     */
    updateReceiver(event: CustomEvent<UpdateReceiverEvent>): void {
      this.unreadMessageCursor = null
      this.searchKeyword = ''
      this.receiver = event.detail
      this.url = this.urlTemplate.replace(':contact', String(event.detail.id))
      this.mount()
    },
  }
}
