import { BookReading } from '@/modules/reading/domain/models'
import { RemoveButton } from '.'
import { Image } from '../components/Image'

interface Props {
  book: BookReading
  onRemoveBook: () => void
}

export function BookReadingComponent({ book, onRemoveBook }: Props) {
  return (
    <article className="relative">
      <Image className="" src={book.cover} alt={book.title} />
      <RemoveButton clasName="absolute top-3 right-2 bg-black" onRemoveBook={onRemoveBook} />
    </article>
  )
}
