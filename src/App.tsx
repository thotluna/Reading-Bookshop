import { ReadingRepository } from '@mod-reading/domain'
import { LocalStorageReadingRepository } from '@mod-reading/infraestructure'
import { ReadingProvider } from '@sec-reading/ReadingContext'
import { Home } from './Home'

function App() {
  const readingRepository: ReadingRepository = LocalStorageReadingRepository()
  return (
    <ReadingProvider repository={readingRepository}>
      <Home />
    </ReadingProvider>
  )
}

export default App
