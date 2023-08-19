import { BookReading, ReadingState } from '@mod-reading/domain'
import { useMemo } from 'react'
import { ReadingBookCollection } from './components/ReadingBookCollection'
import { ReadingEmpty } from './components/ReadingEmpty'

interface Props {
  state: ReadingState
  onRemoveBook: (book: BookReading) => void
  onSaveList: (collections: BookReading[]) => void
}

export function ReadingComponent({ state, onRemoveBook, onSaveList }: Props) {
  const hidden = useMemo(() => {
    return state.show ? 'visible' : 'hidden'
  }, [state.show])

  return (
    <section data-testid="reading-component" className={`w-1/4, ${hidden}`}>
      <header className="px-2 md:px-8 md:py-4 flex flex-wrap gap-2 items-end justify-start">
        <h2 className="text-4xl md:text-6xl ">Leer</h2>
        <h2 className="text-2xl text-slate-500">Libros por Leer: {state.total}</h2>
      </header>
      <ReadingBookCollection collection={state.books} onRemoveBook={onRemoveBook} onSaveList={onSaveList} />
      <ReadingEmpty collection={state.books} />
    </section>
  )
}
