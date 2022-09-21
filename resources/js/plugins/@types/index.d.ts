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

  export type GetAllPrivateMessagesResult = {
    data: PrivateMessage[]
    links: {
      first: string | null,
      last: string | null,
      prev: string | null,
      next: string | null,
    },
    meta: {
      path: string,
      per_page: number,
      next_cursor: string | null,
      prev_cursor: string | null,
    },
  }

  export type SendPrivateMessageResult = {
    data: PrivateMessage
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

    get createdAtHighlight(): string
    set rawReadAt(time: string)
  }
}

declare namespace Components {
  export interface ChatBoxComponent {
    isMinimized: boolean
    isContactOpened: boolean
    isMessageBoxOpened: boolean
    isNotificationAllowed: boolean | null
    hasNotificationPermission: boolean
    online: boolean

    init(this: ChatBoxComponent & AlpineComponent): void
    requestNotificationPermission(this: ChatBoxComponent & AlpineComponent): void
    sendPushNotification(this: ChatBoxComponent & AlpineComponent, event: Event): void
  }

  export interface ContactComponent {
    contacts: Data.Contact[]
    search: string
    url: string

    init(this: ContactComponent & AlpineComponent): void
    mount(this: ContactComponent & AlpineComponent, url: string): void
    get filteredContacts(): Data.Contact[]
    findSameContact(searchId: number): Data.Contact
    onHere(this: ContactComponent & AlpineComponent, values: Api.Contact[]): void
    onSomeoneJoining(this: ContactComponent & AlpineComponent, value: Api.Contact): void
    onSomeoneLeaving(this: ContactComponent & AlpineComponent, value: Api.Contact): void
    registerEchoEventListeners(this: ContactComponent & AlpineComponent): void
    updateLastPrivateMessage(this: ContactComponent & AlpineComponent, event: Event): void
    updateReceiver(this: ContactComponent & AlpineComponent, value: Data.Contact): void
  }

  export interface PrivateMessageComponent {
    isInfoBoxOpened: boolean
    isLoading: boolean
    isLoadingShowMore: boolean
    isLoadingSentMessage: boolean
    isSearchOpened: boolean
    messageIdWithOpenDialog: number | null
    messages: Data.PrivateMessage[]
    newMessageValue: string
    receiver: Data.Contact | null
    searchKeyword: string
    selectedMessage: Data.PrivateMessage | null
    seenMessages: number[]
    unreadMessageCursor: number | null
    url: string
    urlTemplate: string
    urlBatchRequest: string
    urlShowMore: string | null

    init(this: PrivateMessageComponent & AlpineComponent): void
    mount(this: PrivateMessageComponent & AlpineComponent): void
    mountMore(this: PrivateMessageComponent & AlpineComponent): void
    get groupedMessages(): Data.PrivateMessage[][]
    markSeenMessagesAsRead(this: PrivateMessageComponent & AlpineComponent): void
    onMessageReceived(this: PrivateMessageComponent & AlpineComponent, event: Events.EchoPrivateMessageSentEvent): void
    onMessageMarkedAsRead(this: PrivateMessageComponent & AlpineComponent, event: Events.EchoPrivateMessageMarkedAsRead): void
    sendNewMessage(this: PrivateMessageComponent & AlpineComponent): void
    registerEchoEventListeners(this: PrivateMessageComponent & AlpineComponent): void
    scrollTo(this: PrivateMessageComponent & AlpineComponent, id: number | null, options?: ScrollIntoViewOptions): void
    setUnreadMessagesMarker(this: PrivateMessageComponent & AlpineComponent): void
    updateReceiver(this: PrivateMessageComponent & AlpineComponent, event: Event): void
  }
}

declare namespace Events {
  export interface PushNotificationEvent extends Event {
    detail: {
      title: string
      body: string
      icon: string
    }
  }

  export interface EchoPrivateMessageSentEvent extends Event {
    detail: Api.PrivateMessage & {
      sender: {
        id: number
        name: string
        avatar: string
      }
    }
  }

  export interface EchoPrivateMessageMarkedAsRead extends Event {
    detail: {
      receiver: { id: number }
      messages: Array<{ id: number, read_at: string }>
    }
  }


  export interface UpdateLastPrivateMessageEvent extends Event {
    detail: Data.PrivateMessage
  }

  export interface UpdateReceiverEvent extends Event {
    detail: Data.Contact
  }
}
