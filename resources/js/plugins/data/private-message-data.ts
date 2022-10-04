import { differenceInDays, intlFormat } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import MessageType from '../enums/message-type'
import type { PrivateMessage } from '../types/api'
import type { FormatOptions } from '../types/date-fns'

const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
const simpleDateFormat: FormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
const simpleTimeFormat: FormatOptions = { hour: 'numeric', hour12: true, minute: 'numeric' }
const dateTimeFormat: FormatOptions = { ...simpleDateFormat, ...simpleTimeFormat }
const fullDateFormat: FormatOptions = { weekday: 'long', ...simpleDateFormat, ...simpleTimeFormat }

class PrivateMessageData {
  public constructor(
    public readonly id: number,
    public readonly receiverId: number,
    public readonly senderId: number,
    public readonly type: MessageType,
    public readonly value: string,
    public readonly createdAt: Date,
    public readAt: Date | null,
  ) {
  }

  public get createdAtHighlight(): string {
    const diffInDays = differenceInDays(this.createdAt, new Date())

    if (diffInDays === 0) {
      return intlFormat(this.createdAt, { hour: 'numeric', hour12: true, minute: 'numeric' })
    }

    if (diffInDays === -1) {
      return 'Yesterday'
    }

    return intlFormat(this.createdAt, { day: 'numeric', month: 'numeric', year: '2-digit' })
  }

  public get createdAtDate(): string {
    return intlFormat(this.createdAt, simpleDateFormat)
  }

  public get createdAtDateTime(): string {
    return intlFormat(this.createdAt, dateTimeFormat)
  }

  public get createdAtTime(): string {
    return intlFormat(this.createdAt, simpleTimeFormat)
  }

  public get createdAtFullDate(): string {
    return intlFormat(this.createdAt, fullDateFormat)
  }

  public get readAtFullDate(): string {
    if (this.readAt === null) {
      return ''
    }

    return intlFormat(this.readAt, fullDateFormat)
  }

  public set readAtTime(time: string) {
    this.readAt = utcToZonedTime(time, clientTimezone)
  }

  public static from(message: PrivateMessage): PrivateMessageData {
    return new this(
      message.id,
      message.receiver_id,
      message.sender_id,
      MessageType[{
        DOCUMENT: 'Document',
        TEXT: 'Text',
      }[message.type] as keyof typeof MessageType],
      message.value,
      utcToZonedTime(message.created_at, clientTimezone),
      message.read_at !== null ? utcToZonedTime(message.read_at, clientTimezone) : null,
    )
  }
}

export default PrivateMessageData
