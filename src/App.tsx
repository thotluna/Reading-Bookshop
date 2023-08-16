import { InMemoryCatalogueRepository } from '@mod-catalogue/infraestructure'
import { CatalogueComponent } from '@sec-catalogue/CatalogueComponent'
import { Header } from '@sections/header/Header'

function App() {
  const repository = InMemoryCatalogueRepository()
  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <CatalogueComponent repository={repository} />
    </div>
  )
}

export default App
