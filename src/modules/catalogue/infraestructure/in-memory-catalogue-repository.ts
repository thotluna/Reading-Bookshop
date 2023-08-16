import { CatalogueRepository } from '../domain/catalogue-repository'
import { BookCatalogue, Catalogue, FiltersState, Gender } from '../domain/models'
import { BookDto } from './book-dto'
import Bookshop from './books.json'

export const InMemoryCatalogueRepository = (): CatalogueRepository => {
  return {
    getCatalogue: (filters?: FiltersState) => getCatalogo(filters)
  }
}

function getCatalogo(filters?: FiltersState): Promise<Catalogue> {
  let books: BookDto[] = Bookshop.library.map((b) => b.book)
  const total = books.length

  if (filters && filters?.genders?.length > 0) {
    books = books.filter((book) => filters.genders.includes(book.genre as Gender))
  }

  if (filters && filters?.nPages > 0) {
    books = books.filter((book) => book.pages >= filters.nPages)
  }

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
