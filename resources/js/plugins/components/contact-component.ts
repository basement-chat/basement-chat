import ContactData from '../data/contact-data'
import type * as Alpine from '../types/alpine'
import type { Response, Contact } from '../types/api'
import type { ContactComponent } from '../types/components'
import type { UpdateLastPrivateMessageEvent } from '../types/events'

export default (): Alpine.Component & ContactComponent => {
  const container = document.querySelector('.contact__container--main')!
  const url = container.getAttribute('data-url') as string

  return {
    contacts: [],
    search: '',
    url,

    /**
     * Hook during the initialization phase of the current Alpine component.
     */
    init(): void {
      (this.$refs as Alpine.Refs)
        .basementChatBox
        .addEventListener('update-last-private-message', this.updateLastPrivateMessage.bind(this))
    },

    /**
     * Load initial component data.
     */
    async mount(): Promise<void> {
      const response = await window.axios
        .get(this.url)
        .then(({ data }) => data) as Response<Contact[]>

      this.contacts = response.data.map((contact) => ContactData.from(contact))

      this.registerEchoEventListeners()
    },

    /**
     * Get contacts filtered by search keywords.
     */
    get filteredContacts(): ContactData[] {
      if (this.search === '') {
        return this.contacts
      }

      return this
        .contacts
        .filter(({ name }) => name.toLowerCase().includes(this.search.toLowerCase()))
    },

    /**
     * Trigger update receiver event to the chat box component.
     */
    updateReceiver(contact: ContactData): void {
      (this.$dispatch as Alpine.Dispatch)('update-receiver', contact)
    },

    /**
     * Find the same contact with the given id in the current component.
     */
    findSameContact(searchId: number): { index: number | null, contact: ContactData | null } {
      const sameContactIndex = this.contacts.findIndex(({ id }) => id === searchId)

      if (sameContactIndex === -1) {
        return { index: null, contact: null }
      }

      return { index: sameContactIndex, contact: this.contacts.at(sameContactIndex)! }
    },

    /**
     * Laravel Echo event listener to see other contacts that are on the current channel.
     */
    onHere(contacts: Contact[]): void {
      contacts.forEach((contact) => {
        const sameContact = this.findSameContact(contact.id).contact

        if (sameContact !== null) {
          sameContact.isOnline = true
        }
      })
    },

    /**
     * Laravel Echo event listener when someone joins the channel.
     */
    onSomeoneJoining(contact: Contact): void {
      const sameContact = this.findSameContact(contact.id).contact

      if (sameContact !== null) {
        sameContact.isOnline = true
      } else {
        const newContact = ContactData.from(contact)

        newContact.isOnline = true
        this.contacts.push(newContact)
      }
    },

    /**
     * Laravel Echo event listener when someone leaves the channel.
     */
    onSomeoneLeaving(contact: Contact): void {
      const sameContact = this.findSameContact(contact.id).contact

      if (sameContact !== null) {
        sameContact.isOnline = false
      }
    },

    /**
     * Register Laravel Echo event listeners.
     */
    registerEchoEventListeners(): void {
      window.Echo.join('basement.contacts')
        .here(this.onHere.bind(this))
        .joining(this.onSomeoneJoining.bind(this))
        .leaving(this.onSomeoneLeaving.bind(this))
    },

    /**
     * HTML DOM event listener to update the last private message in the current component.
     */
    updateLastPrivateMessage(event: CustomEvent<UpdateLastPrivateMessageEvent>): void {
      const sameContactIndex = this.findSameContact(event.detail.senderId).index

      if (sameContactIndex === null) {
        return
      }

      const sameContact = this.contacts.splice(sameContactIndex, 1).at(0)!

      sameContact.lastPrivateMessage = event.detail

      if (sameContact.id !== event.detail.senderId) {
        sameContact.unreadMessages += 1
      }

      this.contacts.unshift(sameContact)
    },
  }
}
