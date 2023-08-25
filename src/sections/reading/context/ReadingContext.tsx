import { ReadingRepository, ReadingState } from '@mod-reading/domain'
import { BookWithPosition } from '@mod-reading/domain/book-with-position'
import { createContext, useReducer } from 'react'

interface ReadingContext {
  readingStore: ReadingState
  dispatch: React.Dispatch<ReadingAction>
  repository: ReadingRepository
}

const INITIAL_READING_CONTEXT: ReadingState = { books: [], total: 0 }

// eslint-disable-next-line react-refresh/only-export-components
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
  | { type: 'save'; payload: BookWithPosition }
  | { type: 'remove'; payload: BookWithPosition }
  | { type: 'saveAll'; payload: BookWithPosition[] }
  | { type: 'saveState'; payload: ReadingState }

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
      return {
        ...state,
        books: action.payload,
        total: action.payload.length
      }
    }
    case 'saveState': {
      return action.payload
    }

    default:
      return state
  }
}
