import { BookWithPosition, ReadingRepository, ReadingState } from '../../../../src/modules/reading/domain'
import { BookMother } from '../../catalogue/domain/models'

export class ReadingStateObjectMother {
  static create({ count, booksReading }: { count?: number; booksReading?: BookWithPosition[] }): ReadingState {
    const books: BookWithPosition[] = BookMother.createList(count ?? 1).map((book, i) => {
      return {
        ...book,
        position: i
      }
    })
    const state = {
      books,
      total: books.length
    } satisfies ReadingState

    return booksReading
      ? {
          books: booksReading,
          total: booksReading.length
        }
      : state
  }
}

type partialReadingRepository = Partial<ReadingRepository>

export class ReadingRepositoryObjectMother {
  static create({
    partial,
    readingState
  }: {
    partial?: partialReadingRepository
    readingState?: ReadingState
  }): ReadingRepository {
    const state = readingState ?? ReadingStateObjectMother.create({})

    const repository = {
      get: vi.fn().mockResolvedValue(state),
      save: vi.fn(),
      delAll: vi.fn()
    } satisfies ReadingRepository

    return {
      ...repository,
      ...partial
    }
  }
}
