import { BooksAvailable } from './BooksAvailable'

export function HeaderCatalogue({ available, total }: { available: number; total: number }) {
  return (
    <header className="flex flex-wrap gap-2 items-end justify-start">
      <h2 className="text-4xl md:text-6xl ">Catalogo</h2>
      <BooksAvailable available={available} total={total} />
    </header>
  )
}
