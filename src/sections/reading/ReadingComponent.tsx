import { useMemo } from 'react'
import { useReading } from '.'
import { usePanel } from '../panel/use-panel'
import { ReadingBookCollection } from './components/ReadingBookCollection'
import { ReadingEmpty } from './components/ReadingEmpty'

export function ReadingComponent() {
  const { panel } = usePanel()
  const { readingStore } = useReading()
  const hidden = useMemo(() => {
    return panel === 'show' ? 'visible' : 'hidden'
  }, [panel])

  return (
    <section data-testid="reading-component" className={`bg-slate-600 px-8 rounded-2xl ${hidden}`}>
      <header className="px-2 md:px-8 md:py-4 flex flex-wrap gap-2 items-end justify-start">
        <h2 className="text-4xl md:text-6xl ">Leer</h2>
        <h2 className="text-2xl text-slate-500">Libros por Leer: {readingStore.total}</h2>
      </header>
      <ReadingBookCollection />
      <ReadingEmpty />
    </section>
  )
}
