import { BookReading } from '@mod-reading/domain'
import { useReading } from '..'
import { useDragAndDrop } from '../hooks/useDragAndDrop'
import BookDragAndDrop from './BookDragAndDrop'
import { BookReadingComponent } from './BookReadingComponent'

export function ReadingBookCollection() {
  const { delBook, saveAllBooks, readingStore } = useReading()
  const { onDragStart, onDragEnter, sortHandler } = useDragAndDrop<BookReading>(readingStore.books, saveAllBooks)

  if (readingStore.books.length === 0) return
  return (
    <section className="w-72  grid grid-cols-auto gap-4 justify-items-center">
      {readingStore.books.map((book) => (
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
              delBook(book)
            }}
          />
        </BookDragAndDrop>
      ))}
    </section>
  )
}
