// @ts-check

import { chatBox } from './chat-box'
import { contact } from './contact'

/**
 * @param {import('alpinejs').Alpine} Alpine
 */
export default (Alpine) => {
  Alpine.data('basementChatBox', chatBox)
  Alpine.data('basementContact', contact)
}
