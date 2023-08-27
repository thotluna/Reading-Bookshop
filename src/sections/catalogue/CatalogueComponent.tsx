import { GetCatalogue } from '@mod-catalogue/application'
import { Catalogue, CatalogueRepository } from '@mod-catalogue/domain'
import { FilterComponent } from '@sec-filters/filters'
import { useFilters } from '@sec-filters/use-filters'
import { useEffect, useState } from 'react'
import { CatalogueBookCollection, CatalogueEmpty, HeaderCatalogue } from './components'

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
      <CatalogueBookCollection collection={state.books} />
    </section>
  )
}
