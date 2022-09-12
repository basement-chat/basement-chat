// @ts-check

/**
 * @returns {import('../@types').ContactComponent}
 */
export const contact = () => {
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
      /** @type import('../@types').ApiContacts */
      const response = await fetch(url).then((result) => result.json())

      response.data.forEach((value) => {
        this.contacts.set(value.id, value)
      })

      this.registerLaravelEchoEventListeners()

      return this
    },

    get filteredContacts() {
      return [...this.contacts.values()].filter(({ name }) => name
        .toLowerCase()
        .includes(this.search.toLowerCase()))
    },

    registerLaravelEchoEventListeners() {
      echo
        .here((/** @type {import('../@types').Contact[]} */ values) => {
          values.forEach((value) => {
            this.contacts.get(value.id).is_online = true
          })
        })
        .joining((/** @type {import('../@types').Contact} */ value) => {
          this.contacts.get(value.id).is_online = true
        })
        .leaving((/** @type {import('../@types').Contact} */ value) => {
          this.contacts.get(value.id).is_online = false
        })
    },
  }
}
