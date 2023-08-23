import { GetCatalogue } from '@mod-catalogue/application'
import { Catalogue, CatalogueRepository } from '@mod-catalogue/domain'
import { useEffect, useState } from 'react'
import Filters from '../Filters'
import { useFilters } from '../Filters/use-filters'
import { CatalogoBookCollection } from './CatalogoBookCollection'
import { CatalogueEmpty } from './CatalogueEmpty'
import { HeaderCatalogue } from './HeaderCatalogue'

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
      <HeaderCatalogue available={state.avalaible} total={state.total} />
      <Filters />
      <CatalogueEmpty collection={state.books} />
      <CatalogoBookCollection collection={state.books} />
    </section>
  )
}
