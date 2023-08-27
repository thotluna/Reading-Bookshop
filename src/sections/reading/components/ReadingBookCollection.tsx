import { DragComponent } from '@sec-dnd/drag-component'
import { Zones } from '@shared/constants'
import { useReading } from '..'
import { BookReadingComponent } from './BookReadingComponent'

export function ReadingBookCollection() {
  const { delBook, readingStore, onSortAndSave } = useReading()

  if (!readingStore.total || readingStore.total === 0) return
  return (
    <section className="w-72 grid grid-cols-auto gap-4 justify-items-center ">
      {readingStore.books.map((book) => (
        <DragComponent book={book} zone={Zones.READING} onSortAndSave={onSortAndSave} key={book.ISBN}>
          <BookReadingComponent
            book={book}
            onRemoveBook={() => {
              delBook(book)
            }}
          />
        </DragComponent>
      ))}
    </section>
  )
}
