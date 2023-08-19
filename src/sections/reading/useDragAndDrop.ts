import { Book, BookCatalogue } from '@mod-catalogue/domain'
import { BookReading } from '@mod-reading/domain'
import { useRef } from 'react'

export function useDragAndDrop<T extends Pick<Book, keyof BookCatalogue>>(
  collection: T[],
  onSave: (books: BookReading[]) => void
) {
  const dragItem = useRef<T | null>()
  const dragOverItem = useRef<T | null>()

  const sortHandler = () => {
    const books = [...collection]

    const indexDragItem = books.findIndex((b) => b.ISBN === dragItem.current?.ISBN)
    const indexDragOverItem = books.findIndex((b) => b.ISBN === dragOverItem.current?.ISBN)

    const draggedItemContext = books.splice(indexDragItem, 1)[0]

    books.splice(indexDragOverItem, 0, draggedItemContext)

    dragItem.current = null
    dragOverItem.current = null

    onSave(
      books.map((b, i) => {
        return {
          ...b,
          position: i
        }
      })
    )
  }

  const onDragStart = (book: T) => {
    dragItem.current = book
  }
  const onDragEnter = (book: T) => {
    dragOverItem.current = book
  }

  return {
    dragItem,
    dragOverItem,
    onDragStart,
    onDragEnter,
    sortHandler
  }
}
