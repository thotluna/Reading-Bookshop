import { BookReading } from '@/modules/reading/domain/models'
import { ReactComponent as DragAndDrop } from '@assets/drag.svg'
import { Image } from '../../components/Image'
import { RemoveButton } from './RemoveButton'

interface Props {
  book: BookReading
  onRemoveBook: () => void
}

export function BookReadingComponent({ book, onRemoveBook }: Props) {
  return (
    <article data-testid="book-reading" className="relative">
      <Image className="" src={book.cover} alt={book.title} />
      <RemoveButton clasName="absolute top-3 right-2 bg-black" title={book.title} onRemoveBook={onRemoveBook} />
      <DragAndDrop />
    </article>
  )
}
