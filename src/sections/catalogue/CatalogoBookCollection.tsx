import { BookCatalogue } from '@mod-catalogue/domain'
import { place } from '@sec-reading/context/DndContext'
import { useReading } from '@sec-reading/hooks'
import { useDnD } from '@sec-reading/hooks/useDnd'
import { BookCatalogueComponent } from '.'

interface Props {
  collection: BookCatalogue[]
}

export function CatalogoBookCollection({ collection }: Props) {
  const { toggleReading, onSortAndSave } = useReading()
  const { onDragEnd, onDragOver, onDragStart } = useDnD(onSortAndSave)
  if (collection.length === 0) return
  return (
    <section
      className="w-full grid grid-cols-auto gap-4 justify-items-center place-content-start "
      data-testid="catalogue-collection"
      onDragOver={() => {
        onDragOver(place.CATALOGUE)
      }}
    >
      {collection.map((book) => (
        <BookCatalogueComponent
          key={book.ISBN}
          book={book}
          onAddReading={() => {
            toggleReading(book)
          }}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
        />
      ))}
    </section>
  )
}
