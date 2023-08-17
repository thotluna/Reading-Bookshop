import { Book } from '@/modules/catalogue/domain'

export interface BookReading extends Pick<Book, 'ISBN' | 'cover' | 'title'> {
  position: number
}

export interface ReadingState {
  books: BookReading[]
  total: number
  show: boolean
}
