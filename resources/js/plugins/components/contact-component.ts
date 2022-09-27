import { AlpineComponent } from 'alpinejs'
import axios from 'axios'
import ContactData from '../data/contact-data'
import { BasementResponse, Contact } from '../types/api'
import { UpdateLastPrivateMessageEvent } from '../types/event'

const container = document.querySelector('.contact__container--main') as HTMLDivElement
const url = container.getAttribute('data-url') as string
const echo = window.Echo.join('basement.contacts')

interface ComponentData {
  contacts: ContactData[]
  search: string
  url: string
}

class ContactComponent extends AlpineComponent<ComponentData> implements ComponentData {
  public contacts: ContactData[] = []

  public search = ''

  public url = url

  /**
   * Hook during the initialization phase of the current Alpine component.
   */
  public init(): void {
    this.$refs
      .basementChatBox
      .addEventListener('update-last-private-message', this.updateLastPrivateMessage.bind(this))
  }

  /**
   * Load initial component data.
   */
  public async mount(): Promise<void> {
    const response = await axios
      .get(this.url)
      .then(({ data }) => data) as BasementResponse<Contact[]>

    this.contacts = response.data.map((contact) => ContactData.from(contact))

    this.registerEchoEventListeners()
  }

  /**
   * Get contacts filtered by search keywords.
   */
  public get filteredContacts(): ContactData[] {
    if (this.search === '') {
      return this.contacts
    }

    return this
      .contacts
      .filter(({ name }) => name.toLowerCase().includes(this.search.toLowerCase()))
  }

  /**
   * Trigger update receiver event to the chat box component.
   */
  public updateReceiver(contact: ContactData): void {
    this.$dispatch('update-receiver', contact)
  }

  /**
   * Find the same contact with the given id in the current component.
   */
  protected findSameContact(searchId: number): { index: number, contact: ContactData | null } {
    const sameContactIndex = this.contacts.findIndex(({ id }) => id === searchId)

    return { index: sameContactIndex, contact: this.contacts[sameContactIndex] ?? null }
  }

  /**
   * Laravel Echo event listener to see other contacts that are on the current channel.
   */
  protected onHere(contacts: Contact[]): void {
    contacts.forEach((contact) => {
      const sameContact = this.findSameContact(contact.id).contact

      if (sameContact !== null) {
        sameContact.isOnline = true
      }
    })
  }

  /**
   * Laravel Echo event listener when someone joins the channel.
   */
  protected onSomeoneJoining(contact: Contact): void {
    const sameContact = this.findSameContact(contact.id).contact

    if (sameContact !== null) {
      sameContact.isOnline = true
    } else {
      const newContact = ContactData.from(contact)

      newContact.isOnline = true
      this.contacts.push(newContact)
    }
  }

  /**
   * Laravel Echo event listener when someone leaves the channel.
   */
  protected onSomeoneLeaving(contact: Contact): void {
    const sameContact = this.findSameContact(contact.id).contact

    if (sameContact !== null) {
      sameContact.isOnline = false
    }
  }

  /**
   * Register Laravel Echo event listeners.
   */
  protected registerEchoEventListeners(): void {
    echo
      .here(this.onHere.bind(this))
      .joining(this.onSomeoneJoining.bind(this))
      .leaving(this.onSomeoneLeaving.bind(this))
  }

  /**
   * HTML DOM event listener to update the last private message in the current component.
   */
  protected updateLastPrivateMessage(event: CustomEvent<UpdateLastPrivateMessageEvent>): void {
    const sameContactIndex = this.findSameContact(event.detail.senderId).index
    const sameContact = this.contacts.splice(sameContactIndex, 1)[0]

    sameContact.lastPrivateMessage = event.detail

    if (sameContact.id !== event.detail.senderId) {
      sameContact.unreadMessages += 1
    }

    this.contacts.unshift(sameContact)
  }
}

export default (): ContactComponent => new ContactComponent()
