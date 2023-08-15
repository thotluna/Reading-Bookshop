import { GetCatalogue } from '@/modules/catalogue/application'
import { Catalogue, CatalogueRepository } from '@/modules/catalogue/domain'
import { useEffect, useState } from 'react'
import { BookCatalogue } from './BookCatalogue'

interface Props {
  repository: CatalogueRepository
}

export function CatalogueComponent({ repository }: Props) {
  const [state, setState] = useState<Catalogue>({ books: [], total: 0, avalaible: 0 })

  useEffect(() => {
    GetCatalogue(repository).then(setState)
  }, [repository])

  return (
    <section>
      <header>
        <h2>Libros Disponibles: {state.avalaible}</h2>
        <h3>de un total de: {state.total}</h3>
      </header>
      <section className="w-full grid  gap-8 grid-cols-auto place-items-center">
        {state.books.map((book) => (
          <BookCatalogue key={book.ISBN} book={book} onAddReading={() => {}} />
        ))}
      </section>
    </section>
  )
}
