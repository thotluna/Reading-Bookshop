import { BookBasic } from './book-basic'

export interface Catalogue {
  books: BookBasic[]
  total: number
  avalaible: number
}
