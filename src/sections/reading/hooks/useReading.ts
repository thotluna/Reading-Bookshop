import { BookBasic } from '@mod-catalogue/domain'
import { GetReading, SaveStateReading } from '@mod-reading/application'
import { BookReading, ReadingState } from '@mod-reading/domain'
import { ITEM_READING } from '@mod-reading/infraestructure'
import { readingContext } from '@sec-reading/context'
import { place } from '@sec-reading/context/DndContext'
import { useCallback, useContext, useEffect } from 'react'

export function useReading() {
  const { readingStore, dispatch, repository } = useContext(readingContext)

  const addBook = useCallback(
    (book: BookReading) => {
      dispatch({ type: 'save', payload: book })
    },
    [dispatch]
  )

  const delBook = useCallback(
    (book: BookReading) => {
      dispatch({ type: 'remove', payload: book })
    },
    [dispatch]
  )

  const excist = useCallback(
    (ISBN: string) => {
      return readingStore.books.some((b: BookReading) => b.ISBN === ISBN)
    },
    [readingStore.books]
  )

  const toggleReading = useCallback(
    (book: BookBasic) => {
      if (excist(book.ISBN)) {
        delBook({ ...book, position: 0 })
      } else {
        addBook({ ...book, position: 0 })
      }
    },
    [addBook, delBook, excist]
  )

  const saveAllBooks = useCallback(
    (books: BookReading[]) => {
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
    (bookDrag: BookBasic, reciveBook: BookBasic | undefined, placeBook: place | undefined) => {
      let books: BookReading[] = []

      if (placeBook === place.CATALOGUE) {
        books = readingStore.books.filter((book) => book.ISBN !== bookDrag.ISBN)
      } else {
        if (reciveBook) {
          books = readingStore.books

          const indexBookDrag = books.findIndex((b) => b.ISBN === bookDrag.ISBN)
          const indexReciveBook = books.findIndex((b) => b.ISBN === reciveBook?.ISBN)

          const draggedItemContext = books.splice(indexBookDrag, 1)[0]

          books.splice(indexReciveBook, 0, draggedItemContext)
        } else {
          books =
            placeBook === place.READING
              ? readingStore.books.concat({ ...bookDrag, position: 0 })
              : readingStore.books.filter((book) => book.ISBN !== bookDrag.ISBN)
        }
      }

      const booksSave = books.map((book, i) => {
        return {
          ...book,
          position: i
        }
      })

      saveAllBooks(booksSave)

      SaveStateReading(repository, {
        books: booksSave,
        total: booksSave.length
      } satisfies ReadingState)
    },
    [readingStore.books, repository, saveAllBooks]
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
    excist,
    onSortAndSave,
    toggleReading
  }
}
