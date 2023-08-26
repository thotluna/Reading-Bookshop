import { Book } from '@mod-catalogue/domain'

export interface BookDto extends Book, Exclude<Book, 'gender'> {
  genre: string
}
