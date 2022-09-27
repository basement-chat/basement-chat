export type BasementResponse<T> = {
  data: T
}

export type BasementPaginatedResponse<T> = BasementResponse<T> & {
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

export type Contact = {
  id: number
  name: string
  avatar: string
  last_private_message: PrivateMessage | null
  unread_messages: number
}

export type PrivateMessage = {
  id: number
  receiver_id: number
  sender_id: number
  type: 'DOCUMENT' | 'TEXT'
  value: string
  read_at: string
  created_at: string
}
