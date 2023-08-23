import { ReactComponent as SearchDraw } from '@assets/search-draw.svg'
import { useReading } from '..'

export function ReadingEmpty() {
  const { readingStore } = useReading()
  if (readingStore.total > 0) return
  return (
    <section className="w-72 h-full flex flex-col items-center justify-center">
      <SearchDraw width={100} height={100} />
      <h2 className="pt-8 text-2xl inline-block w-64 text-center">
        Todavia no has seleccionado ningun libro para leer.
      </h2>
    </section>
  )
}
