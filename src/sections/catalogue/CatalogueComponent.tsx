import { GetCatalogue } from '@/modules/catalogue/application'
import { BookCatalogue, Catalogue, CatalogueRepository } from '@/modules/catalogue/domain'
import { useEffect, useState } from 'react'
import { CatalogoBookCollection } from './CatalogoBookCollection'
import { CatalogueEmpty } from './CatalogueEmpty'

interface Props {
  repository: CatalogueRepository
}

export function CatalogueComponent({ repository }: Props) {
  const [state, setState] = useState<Catalogue>({ books: [], total: 0, avalaible: 0 })

  useEffect(() => {
    GetCatalogue(repository).then(setState)
  }, [repository])

  const addReadingHandler = (book: BookCatalogue) => {
    book
  }

  return (
    <section className="w-full h-full flex flex-col">
      <header className="p-2 md:p-8 flex flex-col gap-2">
        <h2 className="text-4xl md:text-6xl ">Catalogo</h2>
        <h2>
          Libros Disponibles: {state.avalaible} de un total de: {state.total}
        </h2>
      </header>
      <CatalogueEmpty collection={state.books} />
      <CatalogoBookCollection collection={state.books} onAddReading={addReadingHandler} />
    </section>
  )
}
