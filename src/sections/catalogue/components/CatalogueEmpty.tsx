import { ReactComponent as SearchDraw } from '@assets/search-draw.svg'
import { BookBasic } from '@mod-catalogue/domain'

interface Props {
  collection: BookBasic[]
}

export function CatalogueEmpty({ collection }: Props) {
  if (collection.length > 0) return
  return (
    <section className="w-full h-full flex-1 flex flex-col items-center justify-center">
      <SearchDraw width={260} height={260} />
      <h2 className="pt-8 text-3xl">Uff! Actualmente no contamos con libros disponibles.</h2>
      <h3 className="text-2xl text-slate-400">Podrías modificar los filtros para mejorar la búsqueda.</h3>
    </section>
  )
}
