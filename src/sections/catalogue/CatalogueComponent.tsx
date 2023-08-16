import { GetCatalogue } from '@/modules/catalogue/application'
import { BookCatalogue, Catalogue, CatalogueRepository, FiltersState } from '@/modules/catalogue/domain'
import { useEffect, useState } from 'react'
import { CatalogoBookCollection } from './CatalogoBookCollection'
import { CatalogueEmpty } from './CatalogueEmpty'

interface Props {
  repository: CatalogueRepository
  filters?: FiltersState | undefined
}

export function CatalogueComponent({ repository, filters }: Props) {
  const [state, setState] = useState<Catalogue>({ books: [], total: 0, avalaible: 0 })

  useEffect(() => {
    GetCatalogue(repository, filters).then(setState)
  }, [repository, filters])

  const addReadingHandler = (book: BookCatalogue) => {
    book
  }

  return (
    <section className="w-full h-full flex-1 flex flex-col">
      <header className="px-2 md:px-8 md:py-4 flex flex-wrap gap-2 items-end justify-start">
        <h2 className="text-4xl md:text-6xl ">Catalogo</h2>
        <h2 className="text-2xl text-slate-500">
          Libros Disponibles: {state.avalaible}/{state.total}
        </h2>
      </header>
      <CatalogueEmpty collection={state.books} />
      <CatalogoBookCollection collection={state.books} onAddReading={addReadingHandler} />
    </section>
  )
}
