import { Home } from './Home'
import { LocalStorageReadingRepository } from './modules/reading'
import { ReadingRepository } from './modules/reading/domain/reading-repository'
import { ReadingProvider } from './sections/reading'

function App() {
  const readingRepository: ReadingRepository = LocalStorageReadingRepository()
  return (
    <ReadingProvider repository={readingRepository}>
      <Home />
    </ReadingProvider>
  )
}

export default App
