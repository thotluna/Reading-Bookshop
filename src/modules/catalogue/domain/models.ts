import { Gender } from './gender'

export interface Author {
  name: string
  otherBooks: string[]
}

export interface Book {
  title: string
  pages: number
  cover: string
  gender: Gender
  synopsis: string
  year: number
  ISBN: string
  author: Author
}

export interface BookCatalogue extends Pick<Book, 'ISBN' | 'cover' | 'title'> {}

export interface FiltersState {
  genders: Gender[]
  nPages: number
  search?: string
}
