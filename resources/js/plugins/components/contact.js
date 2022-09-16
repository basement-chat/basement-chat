// @ts-check

import contact from '../data/contact'
import { LISTENERS as PRIVATE_MESSAGE_LISTENERS } from './private-message'

export const LISTENERS = {
  UPDATE_LAST_PRIVATE_MESSAGE: 'update-last-private-message',
}

/**
 * @returns {import('../@types').Components.ContactComponent}
 */
export const contactComponent = () => {
  const echo = window.Echo.join('basement.contacts')

  return {
    contacts: [],
    search: '',
    url: '',

    init() {
      this.$refs.basementChatBox.addEventListener(
        LISTENERS.UPDATE_LAST_PRIVATE_MESSAGE,
        this.updateLastPrivateMessage.bind(this),
      )
    },

    async mount() {
      /** @type import('../@types').Api.GetAllContactsResult */
      const response = await fetch(this.url).then((result) => result.json())

      this.contacts = response.data.map((value) => contact(value))

      this.registerEchoEventListeners()
    },

    get filteredContacts() {
      if (this.search === '') {
        return this.contacts
      }

      return this.contacts.filter(({ name }) => name.toLowerCase().includes(this.search.toLowerCase()))
    },

    onHere(values) {
      values.forEach((value) => {
        const sameContact = this.contacts.find(({ id }) => id === value.id)
        sameContact.isOnline = true
      })
    },

    onSomeoneJoining(value) {
      const sameContact = this.contacts.find(({ id }) => id === value.id)

      if (sameContact === undefined) {
        const data = contact(value)
        data.isOnline = true
        this.contacts.push(data)
      } else {
        sameContact.isOnline = true
      }
    },

    onSomeoneLeaving(value) {
      const sameContact = this.contacts.find(({ id }) => id === value.id)
      sameContact.isOnline = false
    },

    registerEchoEventListeners() {
      echo
        .here(this.onHere.bind(this))
        .joining(this.onSomeoneJoining.bind(this))
        .leaving(this.onSomeoneLeaving.bind(this))
    },

    updateLastPrivateMessage(/** @type import('../@types').Events.UpdateLastPrivateMessageEvent */ event) {
      const sameContactIndex = this.contacts.findIndex(({ id }) => id === event.detail.id)
      const sameContact = this.contacts.splice(sameContactIndex, 1)[0]

      sameContact.lastPrivateMessage = event.detail

      this.contacts.unshift(sameContact)
    },

    updateReceiver(value) {
      this.$dispatch(PRIVATE_MESSAGE_LISTENERS.UPDATE_RECEIVER, value)
    },
  }
}
