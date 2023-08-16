import { InMemoryCatalogueRepository } from '@mod-catalogue/infraestructure'
import { CatalogueComponent } from '@sec-catalogue/CatalogueComponent'
import { Header } from '@sections/header/Header'
import { ReadingComponent } from './sections/reading/ReadingComponent'
import { Filters } from './sections/Filters'

function App() {
  const repository = InMemoryCatalogueRepository()

  return (
    <div className="w-full h-full flex flex-col">
      <Header>
        <Filters />
      </Header>
      <main className="container mx-auto">
        <div className="w-full flex justify-between">
          <CatalogueComponent repository={repository} />
          <ReadingComponent />
        </div>
      </main>
    </div>
  )
}

export default App
