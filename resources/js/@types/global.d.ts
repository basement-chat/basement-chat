import type { Alpine } from 'alpinejs'
import type axios from 'axios'
import type Echo from 'laravel-echo'
import type Pusher from 'pusher-js'
import type { PushNotificationEvent, UpdateLastPrivateMessageEvent, UpdateReceiverEvent } from '../plugins/types/events'

declare global {
  interface HTMLElementEventMap {
    'send-push-notification': CustomEvent<PushNotificationEvent>
    'update-last-private-message': CustomEvent<UpdateLastPrivateMessageEvent>
    'update-receiver': CustomEvent<UpdateReceiverEvent>
  }

  interface HTMLElementTagNameMap {
    '.chat-box__container--main': HTMLDivElement
    '.contact__container--main': HTMLDivElement
    '.private-message__container--main': HTMLDivElement
  }

  interface Window {
    Alpine: Alpine
    axios: typeof axios
    Echo: Echo
    Pusher: typeof Pusher
  }
}
