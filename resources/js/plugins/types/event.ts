import ContactData from '../data/contact-data'
import PrivateMessageData from '../data/private-message-data'
import { PrivateMessage } from './api'

export type PushNotificationEvent = {
  title: string,
  body: string,
  icon: string,
}

export type UpdateLastPrivateMessageEvent = PrivateMessageData

export type UpdateReceiverEvent = ContactData

export type PrivateMessageSentEvent = PrivateMessage & {
  sender: {
    id: number
    name: string
    avatar: string
  }
}

export type PrivateMessageMarkedAsReadEvent = {
  receiver: { id: number }
  messages: { id: number, read_at: string }[]
}
