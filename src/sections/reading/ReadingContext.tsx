import { BookReading, ReadingState } from '@/modules/reading'
import { ReadingRepository } from '@/modules/reading/domain/reading-repository'
import { createContext, useReducer } from 'react'

interface ReadingStore {
  collections: BookReading[]
  count: number
}

interface ReadingContext {
  readingStore: ReadingState
  dispatch: React.Dispatch<ReadingAction>
  repository: ReadingRepository
}

const INITIAL_READING_CONTEXT: ReadingState = { books: [], total: 0, show: false }

export const readingContext = createContext<ReadingContext>({} as ReadingContext)

interface Props {
  children: JSX.Element | JSX.Element[]
  repository: ReadingRepository
}

export function ReadingProvider({ children, repository }: Props) {
  const [readingStore, dispatch] = useReducer(ReadingReduce, INITIAL_READING_CONTEXT)

  return <readingContext.Provider value={{ readingStore, dispatch, repository }}>{children}</readingContext.Provider>
}

type ReadingAction =
  | { type: 'save'; payload: BookReading }
  | { type: 'remove'; payload: BookReading }
  | { type: 'saveAll'; payload: BookReading[] }
  | { type: 'saveState'; payload: ReadingState }
  | { type: 'changeShow'; payload: boolean }

export function ReadingReduce(state: ReadingState, action: ReadingAction): ReadingState {
  switch (action.type) {
    case 'save': {
      const book = action.payload
      const collections = state.books.concat({ ...book, position: 0 }).map((b, i) => {
        return {
          ...b,
          position: i
        }
      })

      return {
        ...state,
        books: collections,
        total: collections.length
      }
    }
    case 'remove': {
      const book = action.payload
      const collections = state.books
        .filter((b) => b.ISBN !== book.ISBN)
        .map((book, index) => {
          return {
            ...book,
            position: index
          }
        })
      return {
        ...state,
        books: collections,
        total: collections.length
      }
    }
    case 'saveAll': {
      const collections = action.payload.map((book, index) => {
        return {
          ...book,
          position: index
        }
      })
      return {
        ...state,
        books: collections,
        total: collections.length
      }
    }
    case 'changeShow': {
      return {
        ...state,
        show: action.payload
      }
    }

    default:
      return state
  }
}
