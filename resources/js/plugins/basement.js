// @ts-check

import { chatBoxComponent } from './components/chat-box'
import { contactComponent } from './components/contact'

// import { privateChat } from './private-chat'

/**
 * @param {import('alpinejs').Alpine} Alpine
 */
export default (Alpine) => {
  Alpine.data('basementChatBox', chatBoxComponent)
  Alpine.data('basementContact', contactComponent)
  // Alpine.data('basementPrivateChat', privateChat)
}
