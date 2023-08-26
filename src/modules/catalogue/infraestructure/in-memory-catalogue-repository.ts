import { Catalogue, CatalogueRepository, Gender } from '@mod-catalogue/domain'
import { FiltersState } from '@mod-filters/domain'
import Bookshop from './books.json'

export const InMemoryCatalogueRepository = (): CatalogueRepository => {
  return {
    getCatalogue: (filters?: FiltersState) => getCatalogo(filters)
  }
}

function getCatalogo(filters?: FiltersState): Promise<Catalogue> {
  let books = Bookshop.library.map((b) => b.book)
  const total = books.length

  if (filters && filters?.genders?.length > 0) {
    books = books.filter((book) => filters.genders.includes(book.genre as Gender))
  }

  if (filters && filters?.nPages > 0) {
    books = books.filter((book) => book.pages >= filters.nPages)
  }

  if (filters && filters?.search) {
    books = books.filter((book) => {
      const search = filters.search?.toLowerCase()
      const author = book.author.name.toLowerCase()
      const gender = book.genre.toLowerCase()
      const synopsis = book.synopsis.toLowerCase()
      const title = book.title.toLowerCase()

      if (!search) return false

      return author.includes(search) || gender.includes(search) || synopsis.includes(search) || title.includes(search)
    })
  }

  const avalaible = books.length

  return Promise.resolve({
    books: books.map((book) => {
      return {
        ISBN: book.ISBN,
        title: book.title,
        cover: book.cover,
        gender: book.genre as Gender
      }
    }),
    total,
    avalaible
  })
}
