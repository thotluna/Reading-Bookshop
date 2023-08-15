import { InMemoryCatalogueRepository } from './modules/catalogue/infraestructure'
import { CatalogueComponent } from './sections/catalogue/CatalogueComponent'

function App() {
  const repository = InMemoryCatalogueRepository()
  return (
    <>
      <CatalogueComponent repository={repository} />
    </>
  )
}

export default App
