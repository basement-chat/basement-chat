import { AlpineComponent } from '@leanadmin/alpine-typescript'
import Echo from 'laravel-echo'
import { Moment } from 'moment-timezone'
import Pusher from 'pusher-js'

declare global {
  interface Window {
    Echo: Echo
    Pusher: Pusher
  }
}

declare namespace Api {
  export type Contact = {
    id: number
    name: string
    avatar: string
    last_private_message: PrivateMessage | null
    unread_messages: number
  }

  export type PrivateMessage = {
    id: number
    receiver_id: number
    sender_id: number
    type: 'DOCUMENT' | 'TEXT'
    value: string
    read_at: string
    created_at: string
  }

  export type GetAllContactsResult = {
    data: Contact[]
  }
}

declare namespace Data {
  export type Contact = {
    id: number
    name: string
    avatar: string
    isOnline: boolean
    lastPrivateMessage: PrivateMessage | null
    unreadMessages: number
  }

  export type PrivateMessage = {
    id: number
    receiverId: number
    senderId: number
    type: 'DOCUMENT' | 'TEXT'
    value: string
    readAt: Moment | null
    createdAt: Moment

    get valueHighlight(): string
    get createdAtHighlight(): string
  }
}

declare namespace Components {
  export interface ChatBoxComponent {
    isMinimized: boolean
    isContactOpened: boolean
    isMessageBoxOpened: boolean
    isNotificationAllowed: boolean | null
    hasNotificationPermission: boolean

    init(this: ChatBoxComponent & AlpineComponent): void
    requestNotificationPermission(this: ChatBoxComponent & AlpineComponent): void
    sendPushNotification(this: ChatBoxComponent & AlpineComponent, event: Event): void
  }

  export interface ContactComponent {
    contacts: Map<number, Data.Contact>
    online: boolean
    search: string

    init(this: ContactComponent & AlpineComponent): void
    mount(this: ContactComponent & AlpineComponent, url: string): Promise<ContactComponent>
    get filteredContacts(): Data.Contact[]
    registerLaravelEchoEventListeners(): void
  }
}

declare namespace Events {
  export interface PushNotificationEvent extends Event {
    detail?: Data.PrivateMessage & { sender?: Data.Contact }
  }

  export interface UpdateReceiverEvent extends Event {
    detail?: Data.Contact
  }
}
