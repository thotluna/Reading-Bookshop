import { CatalogoBookCollection } from '@sec-catalogue/CatalogoBookCollection'
import { BookCatalogue } from '@/modules/catalogue/domain'
import { ReadingState } from '@/modules/reading/domain/models'
import { useMemo } from 'react'

interface Props {
  state: ReadingState
  toToggleBook: (book: BookCatalogue) => void
}

export function ReadingComponent({ state, toToggleBook }: Props) {
  const hidden = useMemo(() => {
    return state.show ? 'visible' : 'hidden'
  }, [state.show])

  return (
    <section data-testid="reading-component" className={`w-1/4, ${hidden}`}>
      <header className="px-2 md:px-8 md:py-4 flex flex-wrap gap-2 items-end justify-start">
        <h2 className="text-4xl md:text-6xl ">Leer</h2>
        <h2 className="text-2xl text-slate-500">Libros por Leer: {state.total}</h2>
      </header>
      <CatalogoBookCollection collection={state.books} onAddReading={toToggleBook} />
    </section>
  )
}
