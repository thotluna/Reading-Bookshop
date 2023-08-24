import { BookReading } from '@mod-reading/domain'
import { useDnD } from '@sec-reading/hooks/useDnd'
import { useReading } from '..'
import BookDragAndDrop from './BookDragAndDrop'
import { BookReadingComponent } from './BookReadingComponent'

export function ReadingBookCollection() {
  const { delBook, readingStore, onSortAndSave } = useReading()

  const { onDragStart, onDragOver, onDragEnter, onDragEnd } = useDnD(onSortAndSave)

  if (!readingStore.total || readingStore.total === 0) return
  return (
    <section className="w-72 grid grid-cols-auto gap-4 justify-items-center ">
      {readingStore.books.map((book) => (
        <BookDragAndDrop<BookReading>
          key={book.ISBN}
          onDragStart={onDragStart}
          onDragEnter={onDragEnter}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
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
