import { BookCatalogue } from '@mod-catalogue/domain'
import { MutableRefObject, ReactNode, createContext, useContext, useRef } from 'react'

export const enum place {
  CATALOGUE = 'catalogue',
  READING = 'reading'
}

interface DndContext {
  bookDrag: MutableRefObject<BookCatalogue | undefined>
  reciveBook: MutableRefObject<BookCatalogue | undefined>
  placeBook: MutableRefObject<place | undefined>
}

export const dndContext = createContext({} as DndContext)

export function DnDProvider({ children }: { children: ReactNode }) {
  const inBook = useRef<BookCatalogue>()
  const outBook = useRef<BookCatalogue>()
  const placeBook = useRef<place | undefined>()

  return (
    <dndContext.Provider value={{ bookDrag: inBook, reciveBook: outBook, placeBook }}>{children}</dndContext.Provider>
  )
}

export function useDnD(
  onSortAndSave: (bookDrag: BookCatalogue, reciveBook: BookCatalogue | undefined, placeBook: place | undefined) => void
) {
  const { bookDrag, reciveBook, placeBook } = useContext(dndContext)

  const onDragStart = (book: BookCatalogue) => {
    bookDrag.current = book
  }
  const onDragEnter = (book: BookCatalogue) => {
    reciveBook.current = book
  }

  const onDragOver = (newPlace: place) => {
    placeBook.current = newPlace
  }

  const onDragEnd = () => {
    if (bookDrag.current === undefined) return
    onSortAndSave(bookDrag.current, reciveBook.current, placeBook.current)
    bookDrag.current = undefined
    reciveBook.current = undefined
    placeBook.current = undefined
  }

  return {
    onDragStart,
    onDragEnter,
    onDragOver,
    onDragEnd
  }
}
