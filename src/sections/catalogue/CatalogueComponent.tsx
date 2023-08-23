import { GetCatalogue } from '@mod-catalogue/application'
import { Catalogue, CatalogueRepository } from '@mod-catalogue/domain'
import { useEffect, useState } from 'react'
import { Filters } from '../Filters'
import { useFilters } from '../Filters/use-filters'
import { CatalogoBookCollection } from './CatalogoBookCollection'
import { CatalogueEmpty } from './CatalogueEmpty'

interface Props {
  repository: CatalogueRepository
}

export function CatalogueComponent({ repository }: Props) {
  const [state, setState] = useState<Catalogue>({ books: [], total: 0, avalaible: 0 })
  const { filtersState } = useFilters()

  useEffect(() => {
    GetCatalogue(repository, filtersState).then(setState)
  }, [repository, filtersState])

  return (
    <section className="flex flex-col">
      <header className="flex flex-wrap gap-2 items-end justify-start">
        <h2 className="text-4xl md:text-6xl ">Catalogo</h2>
        <h2 className="text-2xl text-slate-500">
          Libros Disponibles: {state.avalaible}/{state.total}
        </h2>
      </header>
      <Filters />
      <CatalogueEmpty collection={state.books} />
      <CatalogoBookCollection collection={state.books} />
    </section>
  )
}
