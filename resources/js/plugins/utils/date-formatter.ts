import { intlFormat, isToday, isYesterday } from 'date-fns'
import { FormatOptions } from '../types/date-fns'

class DateFormatter {
  /**
   * @example December 31, 2022
   */
  protected readonly dateFormat: FormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }

  /**
   * @example 12/31/22
   */
  protected readonly shortDateFormat: FormatOptions = {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit',
  }

  /**
   * @example 12:15 PM
   */
  protected readonly timeFormat: FormatOptions = {
    hour: 'numeric',
    hour12: true,
    minute: 'numeric',
  }

  /**
   * @example December 31, 2022 at 12:15 PM
   */
  protected readonly dateTimeFormat: FormatOptions = {
    ...this.dateFormat,
    ...this.timeFormat,
  }

  /**
   * @example Saturday, December 31, 2022 at 12:15 PM
   */
  protected readonly dayDateTimeFormat: FormatOptions = {
    weekday: 'long',
    ...this.dateFormat,
    ...this.timeFormat,
  }

  public constructor(
    public date: Date | null,
  ) {
  }

  public get withinDifferenceDateFormat(): string {
    if (this.date === null) {
      return ''
    }

    if (isToday(this.date) === true) {
      return intlFormat(this.date, this.timeFormat)
    }

    if (isYesterday(this.date) === true) {
      return 'Yesterday'
    }

    return intlFormat(this.date, this.shortDateFormat)
  }

  public get withinDateFormat(): string {
    return this.date === null ? '' : intlFormat(this.date, this.dateFormat)
  }

  public get withinTimeFormat(): string {
    return this.date === null ? '' : intlFormat(this.date, this.timeFormat)
  }

  public get withinDateTimeFormat(): string {
    return this.date === null ? '' : intlFormat(this.date, this.dateTimeFormat)
  }

  public get withinDayDateTimeFormat(): string {
    return this.date === null ? '' : intlFormat(this.date, this.dayDateTimeFormat)
  }
}

export default DateFormatter
