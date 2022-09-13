// @ts-check

import privateMessage from './private-message'

/**
 * @param {import('../../@types').Api.Contact} contact
 * @returns {import('../../@types').Data.Contact}
 */
export default (contact) => ({
  id: contact.id,
  name: contact.name,
  avatar: contact.avatar,
  isOnline: false,
  lastPrivateMessage: contact.last_private_message !== null ? privateMessage(contact.last_private_message) : null,
  unreadMessages: contact.unread_messages,
})
