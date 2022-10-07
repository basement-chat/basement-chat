import { differenceInDays, intlFormat } from 'date-fns'
import { FormatOptions } from '../types/date-fns'

class DateFormatter {
  protected readonly dateFormat: FormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }

  protected readonly shortDateFormat: FormatOptions = {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit',
  }

  protected readonly timeFormat: FormatOptions = {
    hour: 'numeric',
    hour12: true,
    minute: 'numeric',
  }

  protected readonly dateTimeFormat: FormatOptions = {
    ...this.dateFormat,
    ...this.timeFormat,
  }

  protected readonly dayDateTimeFormat: FormatOptions = {
    weekday: 'long',
    ...this.dateFormat,
    ...this.timeFormat,
  }

  public constructor(
    public date: Date | null,
  ) {
  }

  public toDiffDateFormat(): string {
    if (this.date === null) {
      return ''
    }

    const diffInDays: number = differenceInDays(this.date, new Date())

    if (diffInDays === 0) {
      return intlFormat(this.date, this.timeFormat)
    }

    if (diffInDays === -1) {
      return 'Yesterday'
    }

    return intlFormat(this.date, this.shortDateFormat)
  }

  public toDateFormat(): string {
    return this.date === null ? '' : intlFormat(this.date, this.dateFormat)
  }

  public toTimeFormat(): string {
    return this.date === null ? '' : intlFormat(this.date, this.timeFormat)
  }

  public toDateTimeFormat(): string {
    return this.date === null ? '' : intlFormat(this.date, this.dateTimeFormat)
  }

  public toDayDateTimeFormat(): string {
    return this.date === null ? '' : intlFormat(this.date, this.dayDateTimeFormat)
  }
}

export default DateFormatter
