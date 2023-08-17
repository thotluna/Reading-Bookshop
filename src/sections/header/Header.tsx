import { ReactComponent as ShowIcon } from '@assets/show.svg'
import { ReactComponent as HiddenIcon } from '@assets/hide.svg'

interface Props {
  show: boolean
  onToggleShow: () => void
}

export function Header({ show, onToggleShow }: Props) {
  return (
    <header className="w-full flex items-end justify-between px-2 md:px-8">
      <h1 className="text-5xl md:text-8xl text-blue-400">Reading Bookshop</h1>
      <button onClick={onToggleShow}>
        {show && <HiddenIcon className="w-6 h-6" aria-label="Mostrar libros por leer" />}
        {!show && <ShowIcon className="w-6 h-6" aria-label="Mostrar libros por leer" />}
      </button>
    </header>
  )
}
