import { ReactComponent as SearchDraw } from '@assets/search-draw.svg'
import { BookCatalogue } from '@mod-catalogue/domain'

interface Props {
  collection: BookCatalogue[]
}

export function CatalogueEmpty({ collection }: Props) {
  if (collection.length > 0) return
  return (
    <section className="w-full h-full flex-1 flex flex-col items-center justify-center">
      <SearchDraw width={260} height={260} />
      <h2 className="pt-8 text-3xl">Uff! Actualmente no contamos con libros disponibles.</h2>
      <h3 className="text-2xl text-slate-400">Podrias modificar los filtros para mejorar la busqueda.</h3>
    </section>
  )
}
