import { BookCatalogue } from '@mod-catalogue/domain'
import { dndContext, place } from '@sec-reading/context/DndContext'

import { useContext } from 'react'

export function useDnD(
  onSortAndSave?: (bookDrag: BookCatalogue, reciveBook: BookCatalogue | undefined, placeBook: place | undefined) => void
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
    if (!onSortAndSave) return
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
