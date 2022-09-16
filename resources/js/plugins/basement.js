// @ts-check

import { chatBoxComponent } from './components/chat-box'
import { contactComponent } from './components/contact'

/**
 * @param {import('alpinejs').Alpine} Alpine
 */
export default (Alpine) => {
  Alpine.data('basementChatBox', chatBoxComponent)
  Alpine.data('basementContact', contactComponent)
}
