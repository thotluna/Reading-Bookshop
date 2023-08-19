import { InMemoryCatalogueRepository } from '@mod-catalogue/infraestructure'
import { CatalogueComponent } from '@sec-catalogue/CatalogueComponent'
import { Header } from '@sections/header/Header'
import { BookCatalogue } from './modules/catalogue/domain'
import { ReadingComponent } from './sections/reading/ReadingComponent'
import { useReading } from './sections/reading/useReading'

export function Home() {
  const repository = InMemoryCatalogueRepository()

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
        <div className="w-full flex justify-between">
          <CatalogueComponent repository={repository} toToggleBook={toToggleHandler} />
          <ReadingComponent onRemoveBook={delBook} state={readingStore} onSaveList={saveAllBooks} />
        </div>
      </main>
    </div>
  )
}
