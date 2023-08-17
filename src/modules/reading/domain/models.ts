import { BookCatalogue } from '@/modules/catalogue/domain'

export interface ReadingState {
  books: BookCatalogue[]
  total: number
  show: boolean
}
