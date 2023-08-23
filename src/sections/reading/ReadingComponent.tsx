import { BookReading, ReadingState } from '@mod-reading/domain'
import { useMemo } from 'react'
import { usePanel } from '../panel/use-panel'
import { ReadingBookCollection } from './components/ReadingBookCollection'
import { ReadingEmpty } from './components/ReadingEmpty'

interface Props {
  state: ReadingState
  onRemoveBook: (book: BookReading) => void
  onSaveList: (collections: BookReading[]) => void
}

export function ReadingComponent({ state, onRemoveBook, onSaveList }: Props) {
  const { panel } = usePanel()
  const hidden = useMemo(() => {
    return panel === 'show' ? 'visible' : 'hidden'
  }, [panel])

  return (
    <section data-testid="reading-component" className={`bg-slate-600 px-8 rounded-2xl ${hidden}`}>
      <header className="px-2 md:px-8 md:py-4 flex flex-wrap gap-2 items-end justify-start">
        <h2 className="text-4xl md:text-6xl ">Leer</h2>
        <h2 className="text-2xl text-slate-500">Libros por Leer: {state.total}</h2>
      </header>
      <ReadingBookCollection collection={state.books} onRemoveBook={onRemoveBook} onSaveList={onSaveList} />
      <ReadingEmpty collection={state.books} />
    </section>
  )
}
