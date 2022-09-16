// @ts-check

import moment from 'moment-timezone'

const PRIVATE_MESSAGE_HIGHLIGHT_MAX_LENGTH = 45

/**
 * @param {import('../@types').Api.PrivateMessage} privateMessage
 * @returns {import('../@types').Data.PrivateMessage}
 */
export default (privateMessage) => {
  const browserClientTimezone = moment.tz.guess()

  return {
    id: privateMessage.id,
    receiverId: privateMessage.receiver_id,
    senderId: privateMessage.sender_id,
    type: privateMessage.type,
    value: privateMessage.value,
    readAt: privateMessage.read_at !== null ? moment(privateMessage.read_at).tz(browserClientTimezone) : null,
    createdAt: moment(privateMessage.created_at).tz(browserClientTimezone),

    get valueHighlight() {
      const suffix = privateMessage.value.length > PRIVATE_MESSAGE_HIGHLIGHT_MAX_LENGTH ? '...' : ''

      return `${privateMessage.value.slice(0, PRIVATE_MESSAGE_HIGHLIGHT_MAX_LENGTH)} ${suffix}`
    },

    get createdAtHighlight() {
      const isToday = this.createdAt.diff(moment.now(), 'days') === 0

      if (isToday === true) {
        return this.createdAt.format('LT')
      }

      return this.createdAt.format('L')
    },
  }
}
