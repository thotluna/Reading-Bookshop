import { BookBasic } from '@mod-catalogue/domain'
import { Image } from '@sec-components/Image'

import ReadButton from './ReadButton'

interface Props {
  book: BookBasic
  onAddReading: () => void
}

export function BookCatalogueComponent({ book, onAddReading }: Props) {
  return (
    <article data-testid="book-catalogue" className="relative cursor-move">
      <Image className="" src={book.cover} alt={`Título: ${book.title}`} />
      <ReadButton title={book.title} clasName="absolute top-3 right-2 bg-black" onAddReading={onAddReading} />
    </article>
  )
}
