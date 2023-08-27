import { useDnD } from '@sec-dnd/hooks/useDnd'
import { usePanel } from '@sec-panel/use-panel'
import { Zones } from '@shared/constants'
import { useMemo } from 'react'
import { useReading } from '.'
import { ReadingBookCollection } from './components/ReadingBookCollection'
import { ReadingEmpty } from './components/ReadingEmpty'

export function ReadingComponent() {
  const { panel } = usePanel()
  const { readingStore } = useReading()
  const { onDragOver } = useDnD()
  const hidden = useMemo(() => {
    return panel === 'show' ? 'visible' : 'hidden'
  }, [panel])

  return (
    <section
      data-testid="reading-component"
      className={`bg-slate-600 px-8 rounded-2xl self-start pb-8 ${hidden}`}
      onDragOver={() => {
        onDragOver(Zones.READING)
      }}
    >
      <header className="px-2 md:px-8 md:py-4 flex flex-wrap gap-2 items-end justify-start">
        <h2 className="text-4xl md:text-6xl ">Leer</h2>
        <h2 className="text-2xl text-slate-500">Libros por Leer: {readingStore.total}</h2>
      </header>
      <ReadingBookCollection />
      <ReadingEmpty />
    </section>
  )
}
