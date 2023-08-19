import { ReadingState } from '../..'
import { ReadingRepository } from '../../domain/reading-repository'

export function RemoveBookReading(repository: ReadingRepository, ISBN: string) {
  repository.get().then((state) => {
    const books = state.books.filter((b) => b.ISBN !== ISBN)
    const newState: ReadingState = {
      ...state,
      books,
      total: books.length
    }
    repository.save(newState)
  })
}
