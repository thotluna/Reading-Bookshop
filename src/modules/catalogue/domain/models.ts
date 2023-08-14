export interface Autor {
  name: string
  otherBooks: string[]
}

export type Gender = 'Fantasía' | 'Ciencia ficción' | 'Zombies' | 'Terror'

export interface Book {
  title: string
  pages: number
  cover: string
  gender: Gender
  synopsis: string
  year: number
  ISBN: string
  author: Autor
}

export interface BookCatalogue extends Pick<Book, 'ISBN' | 'cover' | 'title'> {}

export interface Catalogue {
  books: BookCatalogue[]
  total: number
  avalaible: number
}
