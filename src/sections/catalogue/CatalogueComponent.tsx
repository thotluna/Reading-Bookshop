import { GetCatalogue } from '@mod-catalogue/application'
import { Catalogue, CatalogueRepository } from '@mod-catalogue/domain'
import { useEffect, useState } from 'react'
import { FilterComponent } from '../Filters/filters'
import { useFilters } from '../Filters/use-filters'
import { CatalogoBookCollection } from './CatalogoBookCollection'
import { CatalogueEmpty } from './CatalogueEmpty'
import { HeaderCatalogue } from './HeaderCatalogue'

interface Props {
  repository: CatalogueRepository
}

export function CatalogueComponent({ repository }: Props) {
  const [state, setState] = useState<Catalogue>({ books: [], total: 0, available: 0 })
  const { filtersState } = useFilters()

  useEffect(() => {
    GetCatalogue(repository, filtersState).then(setState)
  }, [repository, filtersState])

  return (
    <section className="flex flex-col" data-testid="catalogue-component">
      <HeaderCatalogue available={state.available} total={state.total} />
      <FilterComponent />
      <CatalogueEmpty collection={state.books} />
      <CatalogoBookCollection collection={state.books} />
    </section>
  )
}
