import { AlpineComponent } from 'alpinejs'
import axios from 'axios'
import Mark from 'mark.js'
import ContactData from '../data/contact-data'
import PrivateMessageData from '../data/private-message-data'
import { BasementResponse, BasementPaginatedResponse, PrivateMessage } from '../types/api'
import { PrivateMessageMarkedAsReadEvent, PrivateMessageSentEvent, UpdateReceiverEvent } from '../types/event'

const intervalInSecondsToMarkMessagesAsRead = 3
const container = document.querySelector('.private-message__container--main') as HTMLDivElement
const urlTemplate = container.getAttribute('data-url') as string
const urlBatchRequest = container.getAttribute('data-batch-request-url') as string
const userId = Number(container.getAttribute('data-user-id') as string)
const echo = window.Echo.join(`basement.contacts.${userId}`)
const highlighter = new Mark('.private-message__text--value')

interface ComponentData {
  isInfoBoxOpened: boolean
  isLoading: boolean
  isLoadingShowMore: boolean
  isLoadingSentMessage: boolean
  isSearchOpened: boolean
  messageIdWithOpenDialog: PrivateMessageData['id'] | null
  messages: PrivateMessageData[]
  newMessageValue: PrivateMessageData['value']
  receiver: ContactData | null
  searchKeyword: string
  selectedMessage: PrivateMessageData | null
  seenMessages: PrivateMessageData['id'][]
  unreadMessageCursor: number | null
  url: string
  urlTemplate: string
  urlBatchRequest: string
  urlShowMore: string | null
}

class PrivateMessageComponent extends AlpineComponent<ComponentData> implements ComponentData {
  public isInfoBoxOpened = false

  public isLoading = true

  public isLoadingShowMore = false

  public isLoadingSentMessage = false

  public isSearchOpened = false

  public messageIdWithOpenDialog: PrivateMessageData['id'] | null = null

  public messages: PrivateMessageData[] = []

  public newMessageValue: PrivateMessageData['value'] = ''

  public receiver: ContactData | null = null

  public searchKeyword = ''

  public selectedMessage: PrivateMessageData | null = null

  public seenMessages: PrivateMessageData['id'][] = []

  public unreadMessageCursor: number | null = null

  public url = ''

  public urlTemplate = urlTemplate

  public urlBatchRequest = urlBatchRequest

  public urlShowMore: string | null = null

  /**
   * Hook during the initialization phase of the current Alpine component.
   */
  public init(): void {
    this.$refs.basementChatBox.addEventListener('update-receiver', this.updateReceiver.bind(this))

    setInterval(
      this.markSeenMessagesAsRead.bind(this),
      intervalInSecondsToMarkMessagesAsRead * 1000,
    )

    this.$watch('messages', () => {
      if (this.searchKeyword.trim() === '') {
        highlighter.unmark()
      } else {
        highlighter.mark(this.searchKeyword.trim())
      }
    })

    this.registerEchoEventListeners()
  }

  /**
   * Load initial component data.
   */
  public async mount(): Promise<void> {
    this.isLoading = true

    const response = await axios
      .get(this.url, { params: { keyword: this.searchKeyword.trim() } })
      .then(({ data }) => data) as BasementPaginatedResponse<PrivateMessage[]>

    this.urlShowMore = response.links.next
    this.messages = response.data.map((message) => PrivateMessageData.from(message))
    this.isLoading = false

    if (this.messages.length > 0) {
      this.setUnreadMessagesMarker()
      this.scrollTo(this.unreadMessageCursor, {
        block: 'center',
      })
    }
  }

  /**
   * Load more component data.
   */
  public async mountMore(): Promise<void> {
    if (this.urlShowMore === null) {
      throw new Error('Next page to load more private messages is not available')
    }

    this.isLoadingShowMore = true

    const response = await axios
      .get(this.urlShowMore, { params: { keyword: this.searchKeyword.trim() } })
      .then(({ data }) => data) as BasementPaginatedResponse<PrivateMessage[]>

    const messages = response.data.map((message) => PrivateMessageData.from(message))
    const currentCursor = this.messages[this.messages.length - 1]

    this.messages.push(...messages)
    this.urlShowMore = response.links.next
    this.isLoadingShowMore = false
    this.scrollTo(currentCursor.id)
  }

  /**
   * Get messages grouped by day of creation.
   */
  public get groupedMessages(): PrivateMessageData[][] {
    const messages = new Map<string, PrivateMessageData[]>()

    Array.from(this.messages).reverse().forEach((message) => {
      const date = message.createdAt.format('LL')

      if (messages.has(date) === false) {
        messages.set(date, [])
      }

      messages.get(date)!.push(message)
    })

    return [...messages.values()]
  }

  /**
   * Send a new message.
   */
  public async sendNewMessage(): Promise<void> {
    if (this.receiver === null) {
      throw new Error('Receiver cannot be empty')
    }

    this.isLoadingSentMessage = true

    const response = await axios
      .post(this.url, { value: this.newMessageValue })
      .then(({ data }) => data) as BasementResponse<PrivateMessage>
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
  }

  /**
   * Update messages that have been seen to the database.
   */
  protected markSeenMessagesAsRead(): void {
    if (this.seenMessages.length === 0) {
      return
    }

    if (this.receiver === null) {
      throw new Error('Receiver cannot be empty')
    }

    axios.patch(this.urlBatchRequest, this.seenMessages.map((value) => ({
      operation: 'mark as read',
      value: { id: value },
    })))

    this.receiver.unreadMessages -= this.seenMessages.length

    this.seenMessages = []
  }

  /**
   * Laravel Echo event listener when a message is received.
   */
  protected onMessageReceived(event: CustomEvent<PrivateMessageSentEvent>): void {
    const receivedMessage = PrivateMessageData.from(event.detail)

    if (
      event.detail.sender_id === this.receiver?.id
      && event.detail.value.includes(this.searchKeyword.trim())
    ) {
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
  }

  /**
   * Laravel Echo event listener when a message is marked as read.
   */
  protected onMessageMarkedAsRead(event: CustomEvent<PrivateMessageMarkedAsReadEvent>): void {
    if (this.receiver?.id === event.detail.receiver.id) {
      event.detail.messages.forEach((value) => {
        const sameMessage = this.messages.find(({ id }) => id === value.id)

        if (sameMessage !== undefined) {
          sameMessage.readAtTime = value.read_at
        }
      })
    }
  }

  /**
   * Register Laravel Echo event listeners.
   */
  protected registerEchoEventListeners(): void {
    echo
      .listen('.basement.message.sent', this.onMessageReceived.bind(this))
      .listen('.basement.message.marked-as-read', this.onMessageMarkedAsRead.bind(this))
  }

  /**
   * Scroll component view to given message id.
   */
  protected scrollTo(id: number | null, options: ScrollIntoViewOptions = {}): void {
    if (id === null) {
      return
    }

    this.$nextTick(() => {
      document.querySelector(`.private-message__text--value[data-id="${id}"]`)?.scrollIntoView(options)
    })
  }

  /**
   * Add unread messages marker to the component.
   */
  protected setUnreadMessagesMarker(): void {
    this.messages.some((message) => {
      if (message.readAt !== null) {
        return true
      }

      if (message.senderId === this.receiver?.id) {
        this.unreadMessageCursor = message.id
      }

      return false
    })
  }

  /**
   * HTML DOM event listener to update the current receiver.
   */
  protected updateReceiver(event: CustomEvent<UpdateReceiverEvent>): void {
    this.unreadMessageCursor = null
    this.searchKeyword = ''
    this.receiver = event.detail
    this.url = this.urlTemplate.replace(':contact', String(event.detail.id))
    this.mount()
  }
}

export default (): PrivateMessageComponent => new PrivateMessageComponent()
