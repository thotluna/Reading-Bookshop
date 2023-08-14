import { Book } from '../domain/models'

export interface BookDto extends Omit<Book, 'gender'> {
  genre: string
}
