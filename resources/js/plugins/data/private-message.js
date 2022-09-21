// @ts-check

import moment from 'moment-timezone'

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

    get createdAtHighlight() {
      const isToday = this.createdAt.diff(moment.now(), 'days') === 0

      if (isToday === true) {
        return this.createdAt.format('LT')
      }

      return this.createdAt.format('L')
    },

    set rawReadAt(time) {
      this.readAt = moment(time).tz(browserClientTimezone)
    },
  }
}
