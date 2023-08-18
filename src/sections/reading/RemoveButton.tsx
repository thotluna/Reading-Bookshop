import { ReactComponent as TrashIcon } from '@assets/trash.svg'
import CircleButton from '../components/CircleButton'

interface Props {
  title: string
  onRemoveBook: () => void
  clasName: string
}

export function RemoveButton({ title, onRemoveBook, clasName = '' }: Props) {
  return (
    <CircleButton className={`${clasName}`} onClick={onRemoveBook}>
      <TrashIcon className="w-4 h-4" aria-label={`Borrar ${title}`} />
    </CircleButton>
  )
}
