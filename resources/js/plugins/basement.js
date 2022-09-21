// @ts-check

import chatBoxComponent from './components/chat-box'
import contactComponent from './components/contact'
import privateMessageComponent from './components/private-message'

/**
 * @param {import('alpinejs').Alpine} Alpine
 */
export default (Alpine) => {
  Alpine.data('basementChatBox', chatBoxComponent)
  Alpine.data('basementContact', contactComponent)
  Alpine.data('basementPrivateChat', privateMessageComponent)
}
