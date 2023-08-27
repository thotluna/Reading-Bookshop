import { ReactComponent as HiddenIcon } from '@assets/hide.svg'
import { ReactComponent as ShowIcon } from '@assets/show.svg'
import { usePanel } from '@sec-panel/use-panel'

export function Header() {
  const { panel, togglePanel } = usePanel()
  return (
    <header className="w-full flex items-end justify-between px-2 md:px-8">
      <h1 className="text-5xl md:text-8xl text-blue-400">Reading Bookshop</h1>
      <button onClick={togglePanel}>
        {panel === 'show' && <HiddenIcon className="w-6 h-6" aria-label="Ocultar lla lista de libros por leer" />}
        {panel === 'hidden' && <ShowIcon className="w-6 h-6" aria-label="Mostrar los libros por leer" />}
      </button>
    </header>
  )
}
