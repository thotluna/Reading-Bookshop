import { GetReading, SaveStateReading } from '@mod-reading/application'
import { BookReading, ReadingState } from '@mod-reading/domain'
import { ITEM_READING } from '@mod-reading/infraestructure'
import { readingContext } from '@sec-reading/context'
import { useContext, useEffect } from 'react'

export function useReading() {
  const { readingStore, dispatch, repository } = useContext(readingContext)

  const addBook = (book: BookReading) => {
    dispatch({ type: 'save', payload: book })
    // SaveBookReading(repository, book)
  }

  const delBook = (book: BookReading) => {
    dispatch({ type: 'remove', payload: book })
    // RemoveBookReading(repository, book.ISBN)
  }

  const excist = (ISBN: string) => {
    return readingStore.books.some((b: BookReading) => b.ISBN === ISBN)
  }

  const changePanel = (show: boolean) => {
    dispatch({ type: 'changeShow', payload: show })
    // ChangePanelReading(repository, show)
  }

  const saveAllBooks = (books: BookReading[]) => {
    dispatch({ type: 'saveAll', payload: books })
  }

  const saveState = (state: ReadingState) => {
    dispatch({ type: 'saveState', payload: state })
  }

  useEffect(() => {
    GetReading(repository).then((state) => {
      saveState(state)
    })

    window.addEventListener('storage', (event) => {
      if (event.key === ITEM_READING) {
        const stateRaw = event.newValue
        if (!stateRaw) return
        const state = JSON.parse(stateRaw)
        if (state === readingStore) return

        dispatch({ type: 'saveState', payload: state })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (readingStore.books.length === 0 && readingStore.show === false && readingStore.total === 0) return
    SaveStateReading(repository, readingStore)
  }, [readingStore, repository])

  return {
    readingStore,
    addBook,
    delBook,
    saveAllBooks,
    excist,
    changePanel
  }
}