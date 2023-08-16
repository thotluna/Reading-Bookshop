import { Image } from '../components/Image'
import ReadButton from './ReadButton'
import { BookCatalogue } from '@/modules/catalogue/domain'

interface Props {
  book: BookCatalogue
  onAddReading: () => void
}

export function BookCatalogueComponent({ book, onAddReading }: Props) {
  return (
    <article className="relative">
      <Image className="" src={book.cover} alt={book.title} />
      <ReadButton clasName="absolute top-3 right-2 bg-black" onAddReading={onAddReading} />
    </article>
  )
}
