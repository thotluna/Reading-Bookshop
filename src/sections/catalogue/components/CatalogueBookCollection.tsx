import { BookBasic } from '@mod-catalogue/domain'
import { DragComponent } from '@sec-dnd/drag-component'
import { useDnD } from '@sec-dnd/hooks/useDnd'
import { useReading } from '@sec-reading/hooks'
import { Zones } from '@shared/constants'
import { BookCatalogueComponent } from '..'

interface Props {
  collection: BookBasic[]
}

export function CatalogueBookCollection({ collection }: Props) {
  const { toggleReading, onSortAndSave } = useReading()
  const { onDragOver } = useDnD()
  if (collection.length === 0) return
  return (
    <section
      className="w-full grid grid-cols-auto gap-4 justify-items-center place-content-start "
      data-testid="catalogue-collection"
      onDragOver={() => {
        onDragOver(Zones.CATALOGUE)
      }}
    >
      {collection.map((book) => (
        <DragComponent key={book.ISBN} book={book} zone={Zones.CATALOGUE} onSortAndSave={onSortAndSave}>
          <BookCatalogueComponent
            key={book.ISBN}
            book={book}
            onAddReading={() => {
              toggleReading(book)
            }}
          />
        </DragComponent>
      ))}
    </section>
  )
}
