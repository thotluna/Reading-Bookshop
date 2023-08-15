import CircleButton from '../components/CircleButton'
import { ReactComponent as Bookmark } from '@assets/bookmark.svg'

interface Props {
  onAddReading: () => void
  clasName: string
}

function ReadButton({ onAddReading, clasName = '' }: Props) {
  return (
    <CircleButton className={`${clasName}`} onClick={onAddReading}>
      <Bookmark className="w-6 h-6" aria-label="Marcar como Leer" />
    </CircleButton>
  )
}

export default ReadButton
