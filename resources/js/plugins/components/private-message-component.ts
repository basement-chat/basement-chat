import type { AlpineComponent } from 'alpinejs'
import Mark from 'mark.js'
import PrivateMessageData from '../data/private-message-data'
import type { Response, PaginatedResponse, PrivateMessage } from '../types/api'
import type { PrivateMessageComponent } from '../types/components'
import type {
  PrivateMessageReceived,
  PrivateMessageSentEvent,
  PrivateMessagesReceivedMarkedAsReadEvent,
  PrivateMessagesSentMarkedAsReadEvent,
  UpdateCurrentlyTypingContactEvent,
  UpdateReceiverEvent,
} from '../types/events'

export default (): AlpineComponent<PrivateMessageComponent> => {
  const container: HTMLDivElement = document.querySelector('.basement-private-messages')!
  const highlighter: Mark = new Mark('.basement-private-messages__message-value')
  let lastMessageObserver: IntersectionObserver
  const urlTemplate: string = container.getAttribute('data-url')!
  const urlBatchRequest: string = container.getAttribute('data-batch-request-url')!
  const urlCurrentlyTypingTemplate: string = container.getAttribute('data-currently-typing-url')!
  const userId = Number(container.getAttribute('data-user-id')!)
  const typingsTimeout = new Map<number, NodeJS.Timeout>()

  return {
    isInfoBoxOpened: false,
    isLastMessageShown: false,
    isLoading: true,
    isLoadingShowMore: false,
    isLoadingSentMessage: false,
    isSearchOpened: false,
    messageIdWithOpenDialog: null,
    messages: [],
    newMessageValue: '',
    receiver: null,
    searchKeyword: '',
    seenMessages: [],
    selectedMessage: null,
    unreadMessageCursor: null,
    url: '',
    urlTemplate,
    urlBatchRequest,
    urlCurrentlyTyping: '',
    urlCurrentlyTypingTemplate,
    urlShowMore: null,

    /**
     * Hook during the initialization phase of the current Alpine component.
     */
    init(): void {
      this.$refs.basementChatBox.addEventListener('update-receiver', this.updateReceiver.bind(this))
      this.$watch('messages', this.watchMessages.bind(this))

      setInterval(this.markSeenMessagesAsRead.bind(this), 3000)
      this.registerEchoEventListeners()

      lastMessageObserver = new IntersectionObserver(this.lastMessageObserver.bind(this), {
        root: this.$el,
        threshold: [0, 1],
      })
    },

    /**
     * Load initial component data.
     */
    async mount(): Promise<void> {
      this.isLoading = true

      const response = await window.axios.get<PaginatedResponse<PrivateMessage[]>>(
        this.url,
        { params: { keyword: this.searchKeyword.trim() } },
      ).then(({ data }) => data)

      this.urlShowMore = response.links.next
      this.messages = response
        .data
        .map((message: PrivateMessage): PrivateMessageData => PrivateMessageData.from(message))

      this.isLoading = false

      if (this.messages.length > 0) {
        this.setUnreadMessagesMarker()
        this.scrollTo(this.unreadMessageCursor ?? this.messages.at(0)!.id, {
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

      const response = await window.axios.get<PaginatedResponse<PrivateMessage[]>>(
        this.urlShowMore,
        { params: { keyword: this.searchKeyword.trim() } },
      ).then(({ data }) => data)

      const messages: PrivateMessageData[] = response
        .data
        .map((message: PrivateMessage): PrivateMessageData => PrivateMessageData.from(message))

      const currentCursor: PrivateMessageData | undefined = this.messages.at(-1)

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
      const messages: Map<string, PrivateMessageData[]> = new Map<string, PrivateMessageData[]>();

      [...this.messages].reverse().forEach((message: PrivateMessageData): void => {
        const date: string = message.createdAt.withinDateFormat

        if (messages.has(date) === false) {
          messages.set(date, [])
        }

        messages.get(date)!.push(message)
      })

      return [...messages.values()]
    },

    /**
     * Send a HTTP request to the currently typing API endpoint.
     */
    async currentlyTyping(): Promise<void> {
      if (this.receiver !== null && this.receiver.id !== userId && this.newMessageValue !== '') {
        await window.axios.get(this.urlCurrentlyTyping)
      }
    },

    /**
     * Action when the last message is hidden or shown.
     */
    lastMessageObserver(entries: IntersectionObserverEntry[]): void {
      const { intersectionRatio }: IntersectionObserverEntry = entries.at(0)!

      if (intersectionRatio > 0.5) {
        this.isLastMessageShown = true
      } else {
        this.isLastMessageShown = false
      }
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

      void window
        .axios
        .patch(this.urlBatchRequest, this.seenMessages.map((value: number): object => ({
          operation: 'mark as read',
          value: { id: value },
        })))

      this.seenMessages = []
    },

    /**
     * Assign observer for the last message.
     */
    observeLastMessage(): void {
      const lastMessage: PrivateMessageData | undefined = this.messages.at(0)

      if (lastMessage === undefined) {
        return
      }

      void this.$nextTick((): void => {
        const lastMessageElement: HTMLParagraphElement = document.querySelector(`.basement-private-messages__message-value[data-id="${lastMessage.id}"]`)!

        lastMessageObserver.disconnect()
        lastMessageObserver.observe(lastMessageElement)
      })
    },

    /**
     * Laravel Echo event listener when a message is received.
     */
    onMessageReceived(event: CustomEvent<PrivateMessageReceived>): void {
      this.setStatusToNotTyping(event.detail.sender_id)

      const receivedMessage: PrivateMessageData = PrivateMessageData.from(event.detail)

      if (
        event.detail.sender_id === this.receiver?.id
        && event.detail.value.includes(this.searchKeyword.trim())
      ) {
        this.messages.unshift(receivedMessage)
      }

      this.$dispatch('update-last-private-message-received', receivedMessage)

      if (userId !== event.detail.sender_id) {
        this.$dispatch('send-push-notification', {
          title: event.detail.sender.name,
          body: event.detail.value,
          icon: event.detail.sender.avatar,
        })
      }

      if (this.isLastMessageShown === true) {
        this.scrollToLastMessage()
      }
    },

    /**
     * Laravel Echo event listener when a message is sent.
     */
    onMessageSent(event: CustomEvent<PrivateMessageSentEvent>): void {
      const sentMessage: PrivateMessageData = PrivateMessageData.from(event.detail)

      if (
        event.detail.receiver_id === this.receiver?.id
        && event.detail.value.includes(this.searchKeyword.trim())
      ) {
        this.messages.unshift(sentMessage)
      }

      this.$dispatch('update-last-private-message-sent', sentMessage)

      if (this.isLastMessageShown === true) {
        this.scrollToLastMessage()
      }
    },

    /**
     * Laravel Echo event listener when sent messages is marked as read.
     */
    onSentMessagesMarkedAsRead(event: CustomEvent<PrivateMessagesSentMarkedAsReadEvent>): void {
      if (this.receiver?.id === event.detail.receiver.id) {
        event.detail.messages.forEach((value: { id: number, read_at: string }): void => {
          const sameMessage: PrivateMessageData | undefined = this
            .messages
            .find(({ id }: PrivateMessageData): boolean => id === value.id)

          if (sameMessage !== undefined) {
            sameMessage.setReadAtTime(value.read_at)
          }
        })
      }
    },

    /**
     * Laravel Echo event listener when received messages is marked as read.
     */
    onReceivedMessagesMarkedAsRead(
      event: CustomEvent<PrivateMessagesReceivedMarkedAsReadEvent>,
    ): void {
      this.$dispatch('update-unread-messages', event.detail)
    },

    /**
     * Laravel Echo event listener when someone in the contact list types a message.
     */
    onContactCurrentlyTyping(event: CustomEvent<UpdateCurrentlyTypingContactEvent>): void {
      if (event.detail.contact.id === userId) {
        return
      }

      this.setStatusToTyping(event.detail.contact.id, 1500)

      if (this.isLastMessageShown === true) {
        this.scrollToLastMessage()
      }
    },

    /**
     * Register Laravel Echo event listeners.
     */
    registerEchoEventListeners(): void {
      window.Echo.join(`basement.contacts.${userId}`)
        .listen('.basement.message.received', this.onMessageReceived.bind(this))
        .listen('.basement.message.sent', this.onMessageSent.bind(this))
        .listen('.basement.message.sent-messages-marked-as-read', this.onSentMessagesMarkedAsRead.bind(this))
        .listen('.basement.message.received-messages-marked-as-read', this.onReceivedMessagesMarkedAsRead.bind(this))
        .listen('.basement.contact.currently-typing', this.onContactCurrentlyTyping.bind(this))
    },

    /**
     * Set the status of the given contact to typing for till specified time in ms
     */
    setStatusToTyping(contactId: number, ms: number): void {
      if (typingsTimeout.has(contactId)) {
        clearTimeout(typingsTimeout.get(contactId))
      } else {
        this.$dispatch('update-currently-typing-contact', {
          contact: {
            id: contactId,
            typing: true,
          },
        })
      }

      typingsTimeout.set(contactId, setTimeout(() => {
        this.$dispatch('update-currently-typing-contact', {
          contact: {
            id: contactId,
            typing: false,
          },
        })

        typingsTimeout.delete(contactId)
      }, ms))
    },

    /**
     * Set the status of the given contact to not typing.
     */
    setStatusToNotTyping(contactId: number): void {
      if (typingsTimeout.has(contactId)) {
        clearTimeout(typingsTimeout.get(contactId))
        typingsTimeout.delete(contactId)
      }

      this.$dispatch('update-currently-typing-contact', {
        contact: {
          id: contactId,
          typing: false,
        },
      })
    },

    /**
     * Scroll component view to given message id.
     */
    scrollTo(id: number | null, options: ScrollIntoViewOptions = {}): void {
      if (id === null) {
        return
      }

      void this.$nextTick((): void => {
        document.querySelector(`.basement-private-messages__message-value[data-id="${id}"]`)?.scrollIntoView(options)
      })
    },

    /**
     * Scroll component view to the last message.
     */
    scrollToLastMessage(): void {
      const lastMessage: PrivateMessageData | undefined = this.messages.at(0)

      this.scrollTo(lastMessage?.id ?? null, {
        behavior: 'smooth',
      })
    },

    /**
     * Action when a given message is visible.
     */
    seeMessage(message: PrivateMessageData): void {
      if (
        this.receiver === null
        || message.receiverId === this.receiver.id
        || message.readAt.date !== null
      ) {
        return
      }

      this.seenMessages.push(message.id)
    },

    /**
     * Send a new message.
     */
    async sendNewMessage(): Promise<void> {
      if (this.receiver === null) {
        throw new Error('Receiver cannot be empty')
      }

      this.isLoadingSentMessage = true

      await window.axios
        .post<Response<PrivateMessage>>(this.url, { value: this.newMessageValue })
        .then(({ data }) => data)

      this.newMessageValue = ''
      this.isLoadingSentMessage = false
    },

    /**
     * Add unread messages marker to the component.
     */
    setUnreadMessagesMarker(): void {
      this.messages.some((message: PrivateMessageData): boolean => {
        if (message.readAt.date !== null) {
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
      this.urlCurrentlyTyping = this.urlCurrentlyTypingTemplate.replace(':contact', String(event.detail.id))
      void this.mount()
    },

    /**
     * Watch when the messages changes.
     */
    watchMessages(): void {
      if (this.searchKeyword.trim() === '') {
        highlighter.unmark()
      } else {
        highlighter.mark(this.searchKeyword.trim())
      }

      this.observeLastMessage()
    },
  }
}
