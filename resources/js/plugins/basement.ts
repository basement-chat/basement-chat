import type { Alpine } from 'alpinejs'
import chatBoxComponent from './components/chat-box-component'
import contactComponent from './components/contact-component'
import privateMessageComponent from './components/private-message-component'

export default (alpine: Alpine): void => {
  alpine.data('basementChatBox', chatBoxComponent)
  alpine.data('basementContact', contactComponent)
  alpine.data('basementPrivateChat', privateMessageComponent)
}
