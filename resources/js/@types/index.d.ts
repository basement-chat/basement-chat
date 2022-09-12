import { AlpineComponent } from "@leanadmin/alpine-typescript"
import Echo, { PresenceChannel } from "laravel-echo"
import Pusher from "pusher-js"

declare global {
  interface Window {
    Echo: Echo
    Pusher: Pusher
  }
}

export type Contact = {
  id: number
  name: string
  avatar: string
  is_online: boolean
}

export type ApiContacts = {
  data: Contact[]
}

export type PrivateMessage = {
  id: number
  value: string
  sent_by: number
  sent_to: number
  seen_at: string
  created_at_date: string
  created_at_hour: string
}

export interface PushNotificationEvent extends Event {
  detail?: PrivateMessage & { sender?: Contact }
}

export interface UpdateReceiverEvent extends Event {
  detail?: Contact
}

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
  contacts: Map<number, Contact>
  online: boolean
  search: string

  init(this: ContactComponent & AlpineComponent): void
  mount(this: ContactComponent & AlpineComponent, url: string): Promise<ContactComponent>
  get filteredContacts(): Contact[]
  registerLaravelEchoEventListeners(): void
}
