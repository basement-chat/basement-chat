import { Alpine } from 'alpinejs'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { PushNotificationEvent, UpdateLastPrivateMessageEvent, UpdateReceiverEvent } from '../plugins/types/event'

declare global {
  interface Window {
    Alpine: Alpine
    Echo: Echo
    Pusher: Pusher
  }

  interface HTMLElementEventMap {
    'send-push-notification': CustomEvent<PushNotificationEvent>
    'update-last-private-message': CustomEvent<UpdateLastPrivateMessageEvent>
    'update-receiver': CustomEvent<UpdateReceiverEvent>
  }

  interface HTMLElementTagNameMap {
    '.contact__container--main': HTMLDivElement
    '.private-message__container--main': HTMLDivElement
  }
}
