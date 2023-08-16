import { CatalogoBookCollection } from '@sec-catalogue/CatalogoBookCollection'
import { BookMother } from '../../../tests/modules/catalogue/domain/models'
const booksFail = BookMother.createList(5)

export function ReadingComponent() {
  return (
    <section className="w-1/4">
      <header className="px-2 md:px-8 md:py-4 flex flex-wrap gap-2 items-end justify-start">
        <h2 className="text-4xl md:text-6xl ">Leer</h2>
        <h2 className="text-2xl text-slate-500">Libros por Leer: 5</h2>
      </header>
      <CatalogoBookCollection collection={booksFail} onAddReading={() => {}} />
    </section>
  )
}
