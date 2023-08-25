import { Book } from '@mod-catalogue/domain'

export interface BookDto extends Book {
  genre: string
}
