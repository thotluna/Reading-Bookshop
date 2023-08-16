import { BookCatalogue } from '@/modules/catalogue/domain'
import { BookCatalogueComponent } from '.'

interface Props {
  collection: BookCatalogue[]
  onAddReading: (book: BookCatalogue) => void
}

export function CatalogoBookCollection({ collection, onAddReading }: Props) {
  if (collection.length === 0) return
  return (
    <section className="px-2 md:px-8 flex-1 grid grid-cols-auto gap-4 justify-items-center">
      {collection.map((book) => (
        <BookCatalogueComponent
          key={book.ISBN}
          book={book}
          onAddReading={() => {
            onAddReading(book)
          }}
        />
      ))}
    </section>
  )
}
