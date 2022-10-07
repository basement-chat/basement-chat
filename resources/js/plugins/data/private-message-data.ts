import { utcToZonedTime } from 'date-fns-tz'
import MessageType from '../enums/message-type'
import type { PrivateMessage } from '../types/api'
import DateFormatter from '../utils/date-formatter'

class PrivateMessageData {
  protected static readonly timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone

  public constructor(
    public readonly id: number,
    public readonly receiverId: number,
    public readonly senderId: number,
    public readonly type: MessageType,
    public readonly value: string,
    public readonly createdAt: DateFormatter,
    public readAt: DateFormatter,
  ) {
  }

  public setReadAtTime(time: string): void {
    this.readAt = new DateFormatter(utcToZonedTime(time, PrivateMessageData.timeZone))
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
      new DateFormatter(utcToZonedTime(message.created_at, PrivateMessageData.timeZone)),
      new DateFormatter(message.read_at !== null ? utcToZonedTime(
        message.read_at,
        PrivateMessageData.timeZone,
      ) : null),
    )
  }
}

export default PrivateMessageData
