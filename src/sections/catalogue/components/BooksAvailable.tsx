export function BooksAvailable({ available, total }: { available: number; total: number }) {
  return (
    <h2 className="text-2xl text-slate-500">
      Libros Disponibles: {available}/{total}
    </h2>
  )
}
