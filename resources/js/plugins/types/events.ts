import type ContactData from '../data/contact-data'
import type PrivateMessageData from '../data/private-message-data'
import type { PrivateMessage } from './api'

export interface PushNotificationEvent {
  title: string
  body: string
  icon: string
}

export type UpdateLastPrivateMessageEvent = PrivateMessageData

export type UpdateReceiverEvent = ContactData

export interface PrivateMessageSentEvent extends PrivateMessage {
  sender: Pick<ContactData, 'id' | 'name' | 'avatar'>
}

export type PrivateMessageReceived = PrivateMessageSentEvent

export interface PrivateMessagesSentMarkedAsReadEvent {
  receiver: { id: number }
  messages: { id: number, read_at: string }[]
}

export interface PrivateMessagesReceivedMarkedAsReadEvent {
  messages: { sender_id: number, total: number }[]
}

export interface UpdateCurrentlyTypingContactEvent {
  contact: Pick<ContactData, 'id' | 'typing'>
}
