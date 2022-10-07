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

export interface ChatBoxComponentData {
  isMinimized: boolean
  isContactOpened: boolean
  isMessageBoxOpened: boolean
  isNotificationAllowed: boolean
  hasNotificationPermission: boolean
  online: boolean
}

export type ChatBoxComponent = ChatBoxComponentData & {
  init(): void
  requestNotificationPermission(): void
  sendPushNotification(event: CustomEvent<PushNotificationEvent>): void
}

export interface ContactComponentData {
  contacts: ContactData[]
  search: string
  url: string
}

export type ContactComponent = ContactComponentData & {
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
}

export interface PrivateMessageComponentData {
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

export type PrivateMessageComponent = PrivateMessageComponentData & {
  init(): void
  mount(): Promise<void>
  mountMore(): Promise<void>
  get groupedMessages(): PrivateMessageData[][]
  sendNewMessage(): Promise<void>
  markSeenMessagesAsRead(): void
  onMessageReceived(event: CustomEvent<PrivateMessageSentEvent>): void
  onMessageMarkedAsRead(event: CustomEvent<PrivateMessageMarkedAsReadEvent>): void
  registerEchoEventListeners(): void
  scrollTo(id: number | null, options?: ScrollIntoViewOptions): void
  setUnreadMessagesMarker(): void
  updateReceiver(event: CustomEvent<UpdateReceiverEvent>): void
}
