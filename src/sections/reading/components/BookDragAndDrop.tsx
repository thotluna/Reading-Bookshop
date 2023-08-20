interface Props<T> {
  book: T
  onDragStart: (book: T) => void
  onDragEnter: (book: T) => void
  onDragEnd: () => void
  children: JSX.Element
}

function BookDragAndDrop<T>({ book, onDragEnd, onDragEnter, onDragStart, children }: Props<T>) {
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
      onDragOver={(e) => e.preventDefault()}
    >
      {children}
    </div>
  )
}

export default BookDragAndDrop
