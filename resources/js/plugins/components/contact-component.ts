import ContactData from '../data/contact-data'
import type { Response, Contact } from '../types/api'
import type { AlpineContactComponent } from '../types/components'
import type { UpdateLastPrivateMessageEvent } from '../types/events'

export default (): AlpineContactComponent => {
  const container: HTMLDivElement = document.querySelector('.contact__container--main')!
  const url: string = container.getAttribute('data-url')!

  return {
    contacts: [],
    search: '',
    unreadMessages: 0,
    url,

    /**
     * Hook during the initialization phase of the current Alpine component.
     */
    init(): void {
      this.$watch('contacts', this.watchContacts.bind(this))
      this.$refs.basementChatBox.addEventListener('update-last-private-message', this.updateLastPrivateMessage.bind(this))
    },

    /**
     * Load initial component data.
     */
    async mount(): Promise<void> {
      const response: Response<Contact[]> = await window.axios
        .get(this.url)
        .then(({ data }: any): any => data)

      this.contacts = response
        .data
        .map((contact: Contact): ContactData => ContactData.from(contact))

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
        .filter(({ name }: ContactData): boolean => (
          name
            .toLowerCase()
            .includes(this.search.toLowerCase())
        ))
    },

    /**
     * Find the same contact with the given id in the current component.
     */
    findSameContact(searchId: number): { index: number | null, contact: ContactData | null } {
      const sameContactIndex: number = this
        .contacts
        .findIndex(({ id }: ContactData): boolean => id === searchId)

      if (sameContactIndex === -1) {
        return { index: null, contact: null }
      }

      return { index: sameContactIndex, contact: this.contacts.at(sameContactIndex)! }
    },

    /**
     * Laravel Echo event listener to see other contacts that are on the current channel.
     */
    onHere(contacts: Contact[]): void {
      contacts.forEach((contact: Contact): void => {
        const sameContact: ContactData | null = this.findSameContact(contact.id).contact

        if (sameContact !== null) {
          sameContact.isOnline = true
        }
      })
    },

    /**
     * Laravel Echo event listener when someone joins the channel.
     */
    onSomeoneJoining(contact: Contact): void {
      const sameContact: ContactData | null = this.findSameContact(contact.id).contact

      if (sameContact !== null) {
        sameContact.isOnline = true
      } else {
        const newContact: ContactData = ContactData.from(contact)

        newContact.isOnline = true
        this.contacts.push(newContact)
      }
    },

    /**
     * Laravel Echo event listener when someone leaves the channel.
     */
    onSomeoneLeaving(contact: Contact): void {
      const sameContact: ContactData | null = this.findSameContact(contact.id).contact

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
      const sameContactIndex: number | null = this.findSameContact(event.detail.senderId).index

      if (sameContactIndex === null) {
        return
      }

      const sameContact: ContactData = this.contacts.splice(sameContactIndex, 1).at(0)!

      sameContact.lastPrivateMessage = event.detail

      if (sameContact.id !== event.detail.receiverId) {
        sameContact.unreadMessages += 1
      }

      this.contacts.unshift(sameContact)
    },

    /**
     * Trigger update receiver event to the chat box component.
     */
    updateReceiver(contact: ContactData): void {
      this.$dispatch('update-receiver', contact)
    },

    /**
     * Watch when the contacts changes.
     */
    watchContacts(newValue: ContactData[]): void {
      this.unreadMessages = newValue.reduce((total: number, contact: ContactData): number => (
        total + contact.unreadMessages
      ), 0)
    },
  }
}
