import { BookReading } from '@/modules/reading'
import { useContext } from 'react'
import { readingContext } from '.'

export function useReading() {
  const { readingStore, dispatch } = useContext(readingContext)

  const addBook = (book: BookReading) => {
    dispatch({ type: 'save', payload: book })
  }

  const delBook = (book: BookReading) => {
    dispatch({ type: 'remove', payload: book })
  }

  const excist = (ISBN: string) => {
    return readingStore.books.some((b) => b.ISBN === ISBN)
  }

  const changePanel = (show: boolean) => {
    dispatch({ type: 'changeShow', payload: show })
  }

  const saveAll = (books: BookReading[]) => {
    dispatch({ type: 'saveAll', payload: books })
  }

  return {
    readingStore,
    addBook,
    delBook,
    saveAll,
    excist,
    changePanel
  }
}
