import { InMemoryCatalogueRepository } from '@mod-catalogue/infrastructure'
import { LocalStorageFiltersRepository } from '@mod-filters/infrastructure'
import { CatalogueComponent } from '@sec-catalogue/CatalogueComponent'
import { FiltersProvider } from '@sec-filters/filters-provider'
import { Header } from '@sec-header/Header'
import { ReadingComponent } from '@sec-reading/ReadingComponent'
import { useMemo } from 'react'

export function Home() {
  const repository = useMemo(() => InMemoryCatalogueRepository(), [])
  const filtersRepository = useMemo(() => LocalStorageFiltersRepository(), [])

  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <main className="container mx-auto">
        <div className="w-full flex justify-between gap-16 p-8 ">
          <FiltersProvider repository={filtersRepository}>
            <CatalogueComponent repository={repository} />
          </FiltersProvider>
          <ReadingComponent />
        </div>
      </main>
    </div>
  )
}
