import type { AlpineComponent } from 'alpinejs'
import type ContactData from '../data/contact-data'
import type PrivateMessageData from '../data/private-message-data'
import type { Contact } from './api'
import type {
  PrivateMessageMarkedAsReadEvent,
  PrivateMessageSentEvent,
  PushNotificationEvent,
  UpdateLastPrivateMessageEvent,
  UpdateReceiverEvent,
} from './events'

interface ChatBoxComponentData {
  isMinimized: boolean
  isContactOpened: boolean
  isMessageBoxOpened: boolean
  isNotificationAllowed: boolean
  hasNotificationPermission: boolean
  online: boolean
  totalUnreadMessages: number
}

interface ChatBoxComponent extends ChatBoxComponentData {
  init(): void
  requestNotificationPermission(): void
  sendPushNotification(event: CustomEvent<PushNotificationEvent>): void
  registerTippy(): void
  watchNotificationStatus(newValue: boolean, oldValue: boolean): void
}

export type AlpineChatBoxComponent = ChatBoxComponent & ThisType<
// eslint-disable-next-line @typescript-eslint/indent
  AlpineComponent<ChatBoxComponentData> & ChatBoxComponent
>

interface ContactComponentData {
  contacts: ContactData[]
  search: string
  unreadMessages: number
  url: string
}

interface ContactComponent extends ContactComponentData {
  init(): void
  mount(): Promise<void>
  get filteredContacts(): ContactData[]
  updateReceiver(contact: ContactData): void
  findSameContact(searchId: number): { index: number | null, contact: ContactData | null }
  onHere(contacts: Contact[]): void
  onSomeoneJoining(contact: Contact): void
  onSomeoneLeaving(contact: Contact): void
  registerEchoEventListeners(): void
  updateLastPrivateMessage(event: CustomEvent<UpdateLastPrivateMessageEvent>): void
  watchContacts(newValue: ContactData[], oldValue: ContactData[]): void
}

export type AlpineContactComponent = ContactComponent & ThisType<
// eslint-disable-next-line @typescript-eslint/indent
  AlpineComponent<ContactComponentData> & ContactComponent
>

interface PrivateMessageComponentData {
  isInfoBoxOpened: boolean
  isLastMessageShown: boolean
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

interface PrivateMessageComponent extends PrivateMessageComponentData {
  init(): void
  mount(): Promise<void>
  mountMore(): Promise<void>
  get groupedMessages(): PrivateMessageData[][]
  sendNewMessage(): Promise<void>
  lastMessageObserver(entries: IntersectionObserverEntry[]): void
  markSeenMessagesAsRead(): void
  observeLastMessage(): void
  onMessageReceived(event: CustomEvent<PrivateMessageSentEvent>): void
  onMessageMarkedAsRead(event: CustomEvent<PrivateMessageMarkedAsReadEvent>): void
  registerEchoEventListeners(): void
  scrollTo(id: number | null, options?: ScrollIntoViewOptions): void
  scrollToLastMessage(): void
  seeMessage(message: PrivateMessageData): void
  setUnreadMessagesMarker(): void
  updateReceiver(event: CustomEvent<UpdateReceiverEvent>): void
  watchMessages(newValue: PrivateMessageData[], oldValue: PrivateMessageData[]): void
}

export type AlpinePrivateMessageComponent = PrivateMessageComponent & ThisType<
// eslint-disable-next-line @typescript-eslint/indent
  AlpineComponent<PrivateMessageComponentData> & PrivateMessageComponent
>
