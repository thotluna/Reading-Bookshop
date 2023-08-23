import { BookCatalogue } from '@mod-catalogue/domain'
import { useReading } from '@sec-reading/hooks'
import { BookCatalogueComponent } from '.'

interface Props {
  collection: BookCatalogue[]
}

export function CatalogoBookCollection({ collection }: Props) {
  const { toggleReading } = useReading()
  if (collection.length === 0) return
  return (
    <section className="w-full grid grid-cols-auto gap-4 justify-items-center place-content-start ">
      {collection.map((book) => (
        <BookCatalogueComponent
          key={book.ISBN}
          book={book}
          onAddReading={() => {
            toggleReading(book)
          }}
        />
      ))}
    </section>
  )
}
