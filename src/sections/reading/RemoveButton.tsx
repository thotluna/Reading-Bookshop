import CircleButton from '../components/CircleButton'
import { ReactComponent as TrashIcon } from '@assets/trash.svg'

interface Props {
  onRemoveBook: () => void
  clasName: string
}

export function RemoveButton({ onRemoveBook, clasName = '' }: Props) {
  return (
    <CircleButton className={`${clasName}`} onClick={onRemoveBook}>
      <TrashIcon className="w-4 h-4" aria-label="Marcar como Leer" />
    </CircleButton>
  )
}
