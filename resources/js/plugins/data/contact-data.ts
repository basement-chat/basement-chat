import type { Contact } from '../types/api'
import PrivateMessageData from './private-message-data'

class ContactData {
  public constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly avatar: string,
    public unreadMessages: number,
    public lastPrivateMessage: PrivateMessageData | null,
    public isOnline: boolean = false,
    public typing: boolean = false,
  ) {
  }

  public static from(contact: Contact): ContactData {
    return new this(
      contact.id,
      contact.name,
      contact.avatar,
      contact.unread_messages,
      contact.last_private_message !== null ? PrivateMessageData.from(
        contact.last_private_message,
      ) : null,
    )
  }
}

export default ContactData
