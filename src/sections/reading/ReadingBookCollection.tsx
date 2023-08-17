import { BookReadingComponent } from '.'
import { BookReading } from '@mod-reading/domain'

interface Props {
  collection: BookReading[]
  onRemoveBook: (book: BookReading) => void
}

export function ReadingBookCollection({ collection, onRemoveBook }: Props) {
  if (collection.length === 0) return
  return (
    <section className="px-2 md:px-8 grid grid-cols-auto gap-4 justify-items-center">
      {collection.map((book) => (
        <BookReadingComponent
          key={book.ISBN}
          book={book}
          onRemoveBook={() => {
            onRemoveBook(book)
          }}
        />
      ))}
    </section>
  )
}
