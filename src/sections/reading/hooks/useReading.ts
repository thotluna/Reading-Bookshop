import { BookBasic } from '@mod-catalogue/domain'
import { GetReading, SaveStateReading } from '@mod-reading/application'
import { BookWithPosition, ReadingState } from '@mod-reading/domain'
import { ITEM_READING } from '@mod-reading/infrastructure'
import { readingContext } from '@sec-reading/context'
import { Zones } from '@shared/constants'
import { useCallback, useContext, useEffect } from 'react'

export function useReading() {
  const { readingStore, dispatch, repository } = useContext(readingContext)

  const addBook = useCallback(
    (book: BookWithPosition) => {
      dispatch({ type: 'save', payload: book })
    },
    [dispatch]
  )

  const delBook = useCallback(
    (book: BookWithPosition) => {
      dispatch({ type: 'remove', payload: book })
    },
    [dispatch]
  )

  const exists = useCallback(
    (ISBN: string) => {
      return readingStore.books.some((b: BookWithPosition) => b.ISBN === ISBN)
    },
    [readingStore.books]
  )

  const toggleReading = useCallback(
    (book: BookBasic) => {
      if (exists(book.ISBN)) {
        delBook({ ...book, position: 0 })
      } else {
        addBook({ ...book, position: 0 })
      }
    },
    [addBook, delBook, exists]
  )

  const saveAllBooks = useCallback(
    (books: BookWithPosition[]) => {
      dispatch({ type: 'saveAll', payload: books })
    },
    [dispatch]
  )

  const saveState = useCallback(
    (state: ReadingState) => {
      dispatch({ type: 'saveState', payload: state })
    },
    [dispatch]
  )

  const onSortAndSave = useCallback(
    (goal: BookBasic, displaced?: BookBasic, zone?: Zones) => {
      if (zone === Zones.READING && exists(goal.ISBN) && !displaced) return
      if (zone === Zones.CATALOGUE && !exists(goal.ISBN)) return
      let books = readingStore.books
      if (zone === Zones.CATALOGUE && exists(goal.ISBN)) {
        books = books.filter((b) => b.ISBN !== goal.ISBN)
      }

      if (zone === Zones.READING && !exists(goal.ISBN) && !displaced) {
        books = books.concat({ ...goal, position: 0 })
      }
      if (zone === Zones.READING && displaced) {
        let temp = books
        if (!exists(goal.ISBN)) {
          temp = temp.concat({ ...goal, position: 0 })
        }
        const indexGoal = temp.findIndex((b) => b.ISBN === goal.ISBN)
        const indexDisplaced = temp.findIndex((b) => b.ISBN === displaced.ISBN)

        const draggedItemContext = temp.splice(indexGoal, 1)[0]
        temp.splice(indexDisplaced, 0, draggedItemContext)
        books = temp
      }

      const booksSorted = books.map((b, i) => {
        return {
          ...b,
          position: i
        }
      })

      saveAllBooks(booksSorted)
      SaveStateReading(repository, {
        books: booksSorted,
        total: booksSorted.length
      })
    },
    [exists, readingStore.books, repository, saveAllBooks]
  )

  useEffect(() => {
    GetReading(repository).then((state) => {
      saveState(state)
    })

    window.addEventListener('storage', (event) => {
      if (event.key === ITEM_READING) {
        const stateRaw = event.newValue
        if (!stateRaw) return
        let state = JSON.parse(stateRaw)
        if (state === readingStore) return
        if (!state.books) {
          state = {
            books: [],
            total: 0
          }
        }

        dispatch({ type: 'saveState', payload: state })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (readingStore.total === 0) return
    SaveStateReading(repository, readingStore)
  }, [readingStore, repository])

  return {
    readingStore,
    addBook,
    delBook,
    saveAllBooks,
    exists: exists,
    onSortAndSave,
    toggleReading
  }
}
