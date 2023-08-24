import { BookCatalogue } from '@mod-catalogue/domain'
import { Image } from '@sec-components'
import { place } from '@sec-reading/context/DndContext'
import ReadButton from './ReadButton'

interface Props {
  book: BookCatalogue
  onAddReading: () => void
  onDragStart: (book: BookCatalogue) => void
  onDragOver: (place: place) => void
  onDragEnd: () => void
}

export function BookCatalogueComponent({ book, onAddReading, onDragStart, onDragOver, onDragEnd }: Props) {
  return (
    <article
      data-testid="book-catalogue"
      className="relative cursor-move"
      draggable
      onDragStart={() => onDragStart(book)}
      onDragOver={(e) => {
        e.preventDefault()
        onDragOver(place.READING)
      }}
      onDragEnd={onDragEnd}
    >
      <Image className="" src={book.cover} alt={`Titulo: ${book.title}`} />
      <ReadButton title={book.title} clasName="absolute top-3 right-2 bg-black" onAddReading={onAddReading} />
    </article>
  )
}
