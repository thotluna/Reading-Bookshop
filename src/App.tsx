import { InMemoryCatalogueRepository } from '@mod-catalogue/infraestructure'
import { CatalogueComponent } from '@sec-catalogue/CatalogueComponent'
import { Header } from '@sections/header/Header'
import { ReadingComponent } from './sections/reading/ReadingComponent'
import { useState } from 'react'
import { BookCatalogue } from './modules/catalogue/domain'
import { ReadingState } from './modules/reading/domain/models'

function App() {
  const repository = InMemoryCatalogueRepository()
  const [readingState, setReadingState] = useState<ReadingState>({
    books: [],
    total: 0,
    show: false
  })

  const toToggleHandler = (book: BookCatalogue) => {
    const books = readingState.books.some((b) => b.ISBN === book.ISBN)
      ? readingState.books.filter((b) => b.ISBN !== book.ISBN)
      : readingState.books.concat(book)
    const state = {
      ...readingState,
      books,
      total: books.length
    }
    setReadingState(state)
  }

  const onToggleShowHandler = () => {
    setReadingState((prev) => {
      return {
        ...prev,
        show: prev.show ? false : true
      }
    })
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Header show={readingState.show} onToggleShow={onToggleShowHandler} />
      <main className="container mx-auto">
        <div className="w-full flex justify-between">
          <CatalogueComponent repository={repository} toToggleBook={toToggleHandler} />
          <ReadingComponent toToggleBook={toToggleHandler} state={readingState} />
        </div>
      </main>
    </div>
  )
}

export default App
