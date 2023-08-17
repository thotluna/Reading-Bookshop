import { BookReading } from '@mod-reading/domain'
import { ReactComponent as SearchDraw } from '@assets/search-draw.svg'

interface Props {
  collection: BookReading[]
}

export function ReadingEmpty({ collection }: Props) {
  if (collection.length > 0) return
  return (
    <section className="w-full h-full flex-1 flex flex-col items-center justify-center">
      <SearchDraw width={260} height={260} />
      <h2 className="pt-8 text-3xl ">Todavia no has seleccionado ningun libro para leer.</h2>
    </section>
  )
}
