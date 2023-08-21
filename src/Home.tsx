import { BookCatalogue } from '@mod-catalogue/domain'
import { InMemoryCatalogueRepository } from '@mod-catalogue/infraestructure'
import { FiltersRepository } from '@mod-filters/domain'
import { LocalStorageFiltersRepository } from '@mod-filters/infraestructure'
import { CatalogueComponent } from '@sec-catalogue/CatalogueComponent'
import { ReadingComponent } from '@sec-reading/ReadingComponent'
import { useReading } from '@sec-reading/hooks'
import { Header } from '../src/sections/header/Header'
import { FiltersProvider } from './sections/Filters/filters-provider'

export function Home() {
  const repository = InMemoryCatalogueRepository()
  const filtersRepository = LocalStorageFiltersRepository() satisfies FiltersRepository

  const { readingStore, addBook, delBook, changePanel, excist, saveAllBooks } = useReading()

  const toToggleHandler = (book: BookCatalogue) => {
    if (excist(book.ISBN)) {
      delBook({ ...book, position: 0 })
    } else {
      addBook({ ...book, position: 0 })
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Header
        show={readingStore.show}
        onToggleShow={() => {
          changePanel(!readingStore.show)
        }}
      />
      <main className="container mx-auto">
        <div className="w-full flex justify-between gap-16 p-8 ">
          <FiltersProvider repository={filtersRepository}>
            <CatalogueComponent repository={repository} toToggleBook={toToggleHandler} />
          </FiltersProvider>
          <ReadingComponent onRemoveBook={delBook} state={readingStore} onSaveList={saveAllBooks} />
        </div>
      </main>
    </div>
  )
}
