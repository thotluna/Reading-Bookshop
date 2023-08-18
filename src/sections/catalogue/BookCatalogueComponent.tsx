import { BookCatalogue } from '@mod-catalogue/domain'
import { Image } from '@sec-components'
import ReadButton from './ReadButton'

interface Props {
  book: BookCatalogue
  onAddReading: () => void
}

export function BookCatalogueComponent({ book, onAddReading }: Props) {
  return (
    <article data-testid="book-catalogue" className="relative">
      <Image className="" src={book.cover} alt={`Titulo: ${book.title}`} />
      <ReadButton title={book.title} clasName="absolute top-3 right-2 bg-black" onAddReading={onAddReading} />
    </article>
  )
}
