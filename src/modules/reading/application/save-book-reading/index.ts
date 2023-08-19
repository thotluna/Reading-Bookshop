import { BookReading, ReadingState } from '../..'
import { ReadingRepository } from '../../domain/reading-repository'

export function SaveBookReading(repository: ReadingRepository, book: BookReading) {
  repository.get().then((state) => {
    const books = state.books.concat(book)
    const newState: ReadingState = {
      ...state,
      books,
      total: books.length
    }
    repository.save(newState)
  })
}
