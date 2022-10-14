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
  sender: {
    id: number
    name: string
    avatar: string
  }
}

export interface PrivateMessageMarkedAsReadEvent {
  receiver: { id: number }
  messages: { id: number, read_at: string }[]
}
