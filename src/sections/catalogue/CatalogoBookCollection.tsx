import { BookCatalogue } from '@mod-catalogue/domain'
import { BookCatalogueComponent } from '.'

interface Props {
  collection: BookCatalogue[]
  onAddReading: (book: BookCatalogue) => void
}

export function CatalogoBookCollection({ collection, onAddReading }: Props) {
  if (collection.length === 0) return
  return (
    <section className="w-full grid grid-cols-auto gap-4 justify-items-center place-content-start ">
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
