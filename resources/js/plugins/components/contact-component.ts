import type { AlpineComponent } from 'alpinejs'
import ContactData from '../data/contact-data'
import type { Response, Contact } from '../types/api'
import type { ContactComponent } from '../types/components'
import type { PrivateMessagesReceivedMarkedAsReadEvent, UpdateCurrentlyTypingContactEvent, UpdateLastPrivateMessageEvent } from '../types/events'

export default (): AlpineComponent<ContactComponent> => {
  const container: HTMLDivElement = document.querySelector('.basement-contacts')!
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
      this.$refs.basementChatBox.addEventListener('update-last-private-message-received', this.updateLastPrivateMessageReceived.bind(this))
      this.$refs.basementChatBox.addEventListener('update-last-private-message-sent', this.updateLastPrivateMessageSent.bind(this))
      this.$refs.basementChatBox.addEventListener('update-currently-typing-contact', this.updateCurrentlyTypingContact.bind(this))
      this.$refs.basementChatBox.addEventListener('update-unread-messages', this.updateUnreadMessages.bind(this))
    },

    /**
     * Load initial component data.
     */
    async mount(): Promise<void> {
      const response = await window.axios
        .get<Response<Contact[]>>(this.url)
        .then(({ data }) => data)

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
     * HTML DOM event listener to update the last private message in the current component when
     * the message has been received.
     */
    updateLastPrivateMessageReceived(event: CustomEvent<UpdateLastPrivateMessageEvent>): void {
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
     * HTML DOM event listener to update the last private message in the current component when
     * the message has been sent.
     */
    updateLastPrivateMessageSent(event: CustomEvent<UpdateLastPrivateMessageEvent>): void {
      const sameContactIndex: number | null = this.findSameContact(event.detail.receiverId).index

      if (sameContactIndex === null) {
        return
      }

      const sameContact: ContactData = this.contacts.splice(sameContactIndex, 1).at(0)!

      sameContact.lastPrivateMessage = event.detail
      this.contacts.unshift(sameContact)
    },

    /**
     * Trigger update receiver event to the chat box component.
     */
    updateReceiver(contact: ContactData): void {
      this.$dispatch('update-receiver', contact)
    },

    /**
     * HTML DOM event listener to update the typing status of the given contact.
     */
    updateCurrentlyTypingContact(event: CustomEvent<UpdateCurrentlyTypingContactEvent>): void {
      const sameContact: ContactData | null = this.findSameContact(event.detail.contact.id).contact

      if (sameContact === null) {
        return
      }

      sameContact.typing = event.detail.contact.typing
    },

    /**
     * HTML DOM event listener to update the unread messages count.
     */
    updateUnreadMessages(event: CustomEvent<PrivateMessagesReceivedMarkedAsReadEvent>): void {
      event.detail.messages.forEach(({ sender_id, total }) => {
        const sameContact: ContactData | null = this.findSameContact(Number(sender_id)).contact

        if (sameContact === null) {
          return
        }

        sameContact.unreadMessages -= total
      })
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
