import type ContactData from '../data/contact-data'
import type PrivateMessageData from '../data/private-message-data'
import type { Contact } from './api'
import type {
  PrivateMessageReceived,
  PrivateMessageSentEvent,
  PrivateMessagesReceivedMarkedAsReadEvent,
  PrivateMessagesSentMarkedAsReadEvent,
  PushNotificationEvent,
  UpdateCurrentlyTypingContactEvent,
  UpdateLastPrivateMessageEvent,
  UpdateReceiverEvent,
} from './events'

export interface ChatBoxComponent {
  isMinimized: boolean
  isContactOpened: boolean
  isMessageBoxOpened: boolean
  isNotificationAllowed: boolean
  hasNotificationPermission: boolean
  online: boolean
  totalUnreadMessages: number
  init(): void
  requestNotificationPermission(): void
  sendPushNotification(event: CustomEvent<PushNotificationEvent>): void
  registerTippy(): void
  watchNotificationStatus(newValue: boolean, oldValue: boolean): void
}

export interface ContactComponent {
  contacts: ContactData[]
  search: string
  unreadMessages: number
  url: string
  init(): void
  mount(): Promise<void>
  get filteredContacts(): ContactData[]
  updateReceiver(contact: ContactData): void
  findSameContact(searchId: number): { index: number | null, contact: ContactData | null }
  onHere(contacts: Contact[]): void
  onSomeoneJoining(contact: Contact): void
  onSomeoneLeaving(contact: Contact): void
  registerEchoEventListeners(): void
  updateLastPrivateMessageReceived(event: CustomEvent<UpdateLastPrivateMessageEvent>): void
  updateLastPrivateMessageSent(event: CustomEvent<UpdateLastPrivateMessageEvent>): void
  updateCurrentlyTypingContact(event: CustomEvent<UpdateCurrentlyTypingContactEvent>): void
  updateUnreadMessages(event: CustomEvent<PrivateMessagesReceivedMarkedAsReadEvent>): void
  watchContacts(newValue: ContactData[], oldValue: ContactData[]): void
}

export interface PrivateMessageComponent {
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
  urlCurrentlyTyping: string
  urlCurrentlyTypingTemplate: string
  urlShowMore: string | null
  init(): void
  mount(): Promise<void>
  mountMore(): Promise<void>
  get groupedMessages(): PrivateMessageData[][]
  currentlyTyping(): Promise<void>
  sendNewMessage(): Promise<void>
  lastMessageObserver(entries: IntersectionObserverEntry[]): void
  markSeenMessagesAsRead(): void
  observeLastMessage(): void
  onMessageReceived(event: CustomEvent<PrivateMessageReceived>): void
  onMessageSent(event: CustomEvent<PrivateMessageSentEvent>): void
  onSentMessagesMarkedAsRead(event: CustomEvent<PrivateMessagesSentMarkedAsReadEvent>): void
  onReceivedMessagesMarkedAsRead(event: CustomEvent<PrivateMessagesReceivedMarkedAsReadEvent>): void
  onContactCurrentlyTyping(event: CustomEvent<UpdateCurrentlyTypingContactEvent>): void
  registerEchoEventListeners(): void
  setStatusToTyping(contactId: number, ms: number): void
  setStatusToNotTyping(contactId: number): void
  scrollTo(id: number | null, options?: ScrollIntoViewOptions): void
  scrollToLastMessage(): void
  seeMessage(message: PrivateMessageData): void
  setUnreadMessagesMarker(): void
  updateReceiver(event: CustomEvent<UpdateReceiverEvent>): void
  watchMessages(newValue: PrivateMessageData[], oldValue: PrivateMessageData[]): void
}
