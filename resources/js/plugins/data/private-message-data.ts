import moment, { Moment } from 'moment-timezone'
import MessageType from '../enums/message-type'
import { PrivateMessage } from '../types/api'

const clientTimezone: string = moment.tz.guess()

class PrivateMessageData {
  public constructor(
    public readonly id: number,
    public readonly receiverId: number,
    public readonly senderId: number,
    public readonly type: MessageType,
    public readonly value: string,
    public readonly createdAt: Moment,
    public readAt: Moment | null,
  ) {
  }

  public get createdAtHighlight(): string {
    const isToday: boolean = this.createdAt.diff(moment.now(), 'days') === 0

    if (isToday === true) {
      return this.createdAt.format('LT')
    }

    return this.createdAt.format('L')
  }

  public set readAtTime(time: string) {
    this.readAt = moment(time).tz(clientTimezone)
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
      moment(message.created_at).tz(clientTimezone),
      message.read_at !== null ? moment(message.read_at).tz(clientTimezone) : null,
    )
  }
}

export default PrivateMessageData
