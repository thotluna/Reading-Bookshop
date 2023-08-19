import { ReactComponent as SearchDraw } from '@assets/search-draw.svg'
import { BookReading } from '@mod-reading/domain'

interface Props {
  collection: BookReading[]
}

export function ReadingEmpty({ collection }: Props) {
  if (collection.length > 0) return
  return (
    <section className="w-72 h-full flex flex-col items-center justify-center">
      <SearchDraw width={100} height={100} />
      <h2 className="pt-8 text-2xl inline-block w-64 text-center">
        Todavia no has seleccionado ningun libro para leer.
      </h2>
    </section>
  )
}
