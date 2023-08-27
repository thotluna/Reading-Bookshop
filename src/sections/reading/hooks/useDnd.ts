import { BookBasic } from '@mod-catalogue/domain'
import { dndContext } from '@sec-reading/context/DndContext'
import { Zones } from '@shared/constants'

import { useContext } from 'react'

export function useDnD(
  onSortAndSave?: (goal: BookBasic, displace: BookBasic | undefined, zone: Zones | undefined) => void
) {
  const { bookDrag, receiveBook: receiveBook, placeBook } = useContext(dndContext)

  const onDragStart = (book: BookBasic) => {
    bookDrag.current = book
  }
  const onDragEnter = (book: BookBasic) => {
    receiveBook.current = book
  }

  const onDragOver = (newPlace: Zones) => {
    placeBook.current = newPlace
  }

  const onDragEnd = () => {
    if (bookDrag.current === undefined) return
    if (!onSortAndSave) return
    onSortAndSave(bookDrag.current, receiveBook.current, placeBook.current)
    bookDrag.current = undefined
    receiveBook.current = undefined
    placeBook.current = undefined
  }

  return {
    onDragStart,
    onDragEnter,
    onDragOver,
    onDragEnd
  }
}
