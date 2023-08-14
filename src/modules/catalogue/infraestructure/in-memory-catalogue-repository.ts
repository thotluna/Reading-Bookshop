import { CatalogueRepository } from '../domain/catalogue-repository'
import { BookCatalogue, Catalogue, Gender } from '../domain/models'
import { BookDto } from './book-dto'
import Bookshop from './books.json'

export const InMemoryCatalogueRepository = (): CatalogueRepository => {
  return {
    getCatalogue: () => getCatalogo()
  }
}

function getCatalogo(): Promise<Catalogue> {
  const books: BookDto[] = Bookshop.library.map((b) => b.book)
  const total = books.length
  const avalaible = books.length

  return Promise.resolve({
    books: books.map((book) => {
      return {
        ...book,
        gender: book.genre as Gender
      } as BookCatalogue
    }),
    total,
    avalaible
  })
}
