export interface Response<T> {
  data: T
}

export interface PaginatedResponse<T> extends Response<T> {
  links: {
    first: string | null
    last: string | null
    prev: string | null
    next: string | null
  }
  meta: {
    path: string
    per_page: number
    next_cursor: string | null
    prev_cursor: string | null
  }
}

export interface Contact {
  id: number
  name: string
  avatar: string
  last_private_message: PrivateMessage | null
  unread_messages: number
}

export interface PrivateMessage {
  id: number
  receiver_id: number
  sender_id: number
  type: 'DOCUMENT' | 'TEXT'
  value: string
  read_at: string | null
  created_at: string
}
