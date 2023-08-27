import { BookBasic } from '@mod-catalogue/domain'
import { Image } from '@sec-components'

import { Zones } from '@shared/constants'
import ReadButton from './ReadButton'

interface Props {
  book: BookBasic
  onAddReading: () => void
  onDragStart: (book: BookBasic) => void
  onDragOver: (place: Zones) => void
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
        onDragOver(Zones.READING)
      }}
      onDragEnd={onDragEnd}
    >
      <Image className="" src={book.cover} alt={`Título: ${book.title}`} />
      <ReadButton title={book.title} clasName="absolute top-3 right-2 bg-black" onAddReading={onAddReading} />
    </article>
  )
}
