import { Book } from '@mod-catalogue/domain'

export interface BookReading extends Pick<Book, 'ISBN' | 'cover' | 'title'> {
  position: number
}

export interface ReadingState {
  books: BookReading[]
  total: number
}
