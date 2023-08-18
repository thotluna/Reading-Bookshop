import { ReactComponent as Bookmark } from '@assets/bookmark.svg'
import CircleButton from '../components/CircleButton'

interface Props {
  title: string
  onAddReading: () => void
  clasName: string
}

function ReadButton({ title, onAddReading, clasName = '' }: Props) {
  return (
    <CircleButton className={`${clasName}`} onClick={onAddReading}>
      <Bookmark className="w-6 h-6" aria-label={`Agregar ${title}`} />
    </CircleButton>
  )
}

export default ReadButton
