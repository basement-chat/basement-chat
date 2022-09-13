// @ts-check

import contact from '../data/contact'

/**
 * @returns {import('../../@types').Components.ContactComponent}
 */
export const contactComponent = () => {
  const echo = window.Echo.join('basement.contacts')

  return {
    contacts: new Map(),
    online: true,
    search: '',

    init() {
      window.addEventListener('online', () => {
        this.online = true
      })

      window.addEventListener('offline', () => {
        this.online = false
      })
    },

    async mount(url) {
      /** @type import('../../@types').Api.GetAllContactsResult */
      const response = await fetch(url).then((result) => result.json())

      response.data.forEach((value) => {
        this.contacts.set(value.id, contact(value))
      })

      this.registerLaravelEchoEventListeners()

      return this
    },

    get filteredContacts() {
      return [...this.contacts.values()]
        .filter(({ name }) => name
          .toLowerCase()
          .includes(this.search.toLowerCase()))
        .sort((a, b) => (b.lastPrivateMessage?.id ?? 0) - (a.lastPrivateMessage?.id ?? 0))
    },

    registerLaravelEchoEventListeners() {
      echo
        .here((/** @type {import('../../@types').Api.Contact[]} */ values) => {
          values.forEach((value) => {
            this.contacts.get(value.id).isOnline = true
          })
        })
        .joining((/** @type {import('../../@types').Api.Contact} */ value) => {
          if (this.contacts.has(value.id) === false) {
            this.contacts.set(value.id, contact(value))
          }

          this.contacts.get(value.id).isOnline = true
        })
        .leaving((/** @type {import('../../@types').Api.Contact} */ value) => {
          this.contacts.get(value.id).isOnline = false
        })
    },
  }
}
