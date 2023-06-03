import type { Alpine } from 'alpinejs'
import type axios from 'axios'
import type Echo from 'laravel-echo'
import type Pusher from 'pusher-js'
import type {
  PrivateMessagesReceivedMarkedAsReadEvent,
  PushNotificationEvent,
  UpdateCurrentlyTypingContactEvent,
  UpdateLastPrivateMessageEvent,
  UpdateReceiverEvent,
} from '../plugins/types/events'

declare global {
  interface HTMLElementEventMap {
    'send-push-notification': CustomEvent<PushNotificationEvent>
    'update-last-private-message-sent': CustomEvent<UpdateLastPrivateMessageEvent>
    'update-last-private-message-received': CustomEvent<UpdateLastPrivateMessageEvent>
    'update-receiver': CustomEvent<UpdateReceiverEvent>
    'update-currently-typing-contact': CustomEvent<UpdateCurrentlyTypingContactEvent>
    'update-unread-messages': CustomEvent<PrivateMessagesReceivedMarkedAsReadEvent>
  }

  interface HTMLElementTagNameMap {
    '.basement-chat-box': HTMLDivElement
    '.basement-contacts': HTMLDivElement
    '.basement-private-messages': HTMLDivElement
  }

  interface Window {
    Alpine: Alpine
    axios: typeof axios
    Echo: Echo
    Pusher: typeof Pusher
  }
}
