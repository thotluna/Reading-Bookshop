import { place } from '@sec-reading/context/DndContext'

interface Props<T> {
  book: T
  onDragStart: (book: T) => void
  onDragEnter: (book: T) => void
  onDragEnd: () => void
  onDragOver: (place: place) => void
  children: JSX.Element
}

function BookDragAndDrop<T>({ book, onDragEnd, onDragEnter, onDragStart, onDragOver, children }: Props<T>) {
  return (
    <div
      className={`drag-and-drop cursor-move transition-transform duration-1000`}
      draggable
      onDragStart={() => {
        onDragStart(book)
      }}
      onDragEnter={() => {
        onDragEnter(book)
      }}
      onDragEnd={() => {
        onDragEnd()
      }}
      onDragOver={(e) => {
        e.preventDefault()
        onDragOver(place.READING)
      }}
    >
      {children}
    </div>
  )
}

export default BookDragAndDrop
