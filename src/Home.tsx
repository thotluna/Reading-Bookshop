import { InMemoryCatalogueRepository } from '@mod-catalogue/infraestructure'
import { LocalStorageFiltersRepository } from '@mod-filters/infraestructure'
import { CatalogueComponent } from '@sec-catalogue/CatalogueComponent'
import { ReadingComponent } from '@sec-reading/ReadingComponent'
import { useMemo } from 'react'
import { Header } from '../src/sections/header/Header'
import { FiltersProvider } from './sections/Filters/filters-provider'

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
