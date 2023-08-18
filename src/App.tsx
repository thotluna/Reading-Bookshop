import { InMemoryCatalogueRepository } from '@mod-catalogue/infraestructure'
import { CatalogueComponent } from '@sec-catalogue/CatalogueComponent'
import { Header } from '@sections/header/Header'
import { useState } from 'react'
import { BookCatalogue } from './modules/catalogue/domain'
import { BookReading, ReadingState } from './modules/reading/domain/models'
import { ReadingComponent } from './sections/reading/ReadingComponent'

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
      : readingState.books.concat({ ...book, position: Number.MAX_SAFE_INTEGER })
    const state = {
      ...readingState,
      books,
      total: books.length
    }
    setReadingState(state)
  }

  const onRemoveBook = (book: BookReading) => {
    setReadingState((prev) => {
      const books = prev.books.filter((bookInMemory) => bookInMemory.ISBN !== book.ISBN)
      return {
        ...readingState,
        books,
        total: books.length
      }
    })
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
          <ReadingComponent onRemoveBook={onRemoveBook} state={readingState} />
        </div>
      </main>
    </div>
  )
}

export default App
