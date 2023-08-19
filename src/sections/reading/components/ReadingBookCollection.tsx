import { BookReading } from '@mod-reading/domain'
import { useDragAndDrop } from '../hooks/useDragAndDrop'
import BookDragAndDrop from './BookDragAndDrop'
import { BookReadingComponent } from './BookReadingComponent'

interface Props {
  collection: BookReading[]
  onRemoveBook: (book: BookReading) => void
  onSaveList: (collection: BookReading[]) => void
}

export function ReadingBookCollection({ collection, onRemoveBook, onSaveList }: Props) {
  const { onDragStart, onDragEnter, sortHandler } = useDragAndDrop<BookReading>(collection, onSaveList)

  if (collection.length === 0) return
  return (
    <section className="w-72  grid grid-cols-auto gap-4 justify-items-center">
      {collection.map((book) => (
        <BookDragAndDrop<BookReading>
          key={book.ISBN}
          onDragStart={onDragStart}
          onDragEnter={onDragEnter}
          onDragEnd={sortHandler}
          book={book}
        >
          <BookReadingComponent
            book={book}
            onRemoveBook={() => {
              onRemoveBook(book)
            }}
          />
        </BookDragAndDrop>
      ))}
    </section>
  )
}