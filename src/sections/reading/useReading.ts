import {
  BookReading,
  ChangePanelReading,
  GetReading,
  ITEM_READING,
  ReadingState,
  RemoveBookReading,
  SaveBookReading
} from '@/modules/reading'
import { useContext, useEffect } from 'react'
import { readingContext } from '.'

export function useReading() {
  const { readingStore, dispatch, repository } = useContext(readingContext)

  const addBook = (book: BookReading) => {
    dispatch({ type: 'save', payload: book })
    SaveBookReading(repository, book)
  }

  const delBook = (book: BookReading) => {
    dispatch({ type: 'remove', payload: book })
    RemoveBookReading(repository, book.ISBN)
  }

  const excist = (ISBN: string) => {
    return readingStore.books.some((b) => b.ISBN === ISBN)
  }

  const changePanel = (show: boolean) => {
    dispatch({ type: 'changeShow', payload: show })
    ChangePanelReading(repository, show)
  }

  const saveAllBooks = (books: BookReading[]) => {
    dispatch({ type: 'saveAll', payload: books })
  }

  const saveState = (state: ReadingState) => {
    dispatch({ type: 'saveState', payload: state })
  }

  useEffect(() => {
    GetReading(repository).then((state) => saveState(state))

    window.addEventListener('storage', (event) => {
      if (event.key === ITEM_READING) {
        const stateRaw = event.newValue
        if (!stateRaw) return
        const state = JSON.parse(stateRaw)
        dispatch({ type: 'saveState', payload: state })
      }
    })
  }, [])

  return {
    readingStore,
    addBook,
    delBook,
    saveAllBooks,
    excist,
    changePanel
  }
}
