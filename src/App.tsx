import { PanelRepository } from '@mod-panel/domain'
import { LocalStoragePanelRepository } from '@mod-panel/infraestructure'
import { ReadingRepository } from '@mod-reading/domain'
import { LocalStorageReadingRepository } from '@mod-reading/infraestructure'
import { ReadingProvider } from '@sec-reading/context'
import { useMemo } from 'react'
import { Home } from './Home'
import { PanelProvider } from './sections/panel/panel-provider'

function App() {
  const readingRepository: ReadingRepository = useMemo(() => LocalStorageReadingRepository(), [])
  const panelRepository: PanelRepository = useMemo(() => LocalStoragePanelRepository(), [])
  return (
    <ReadingProvider repository={readingRepository}>
      <PanelProvider repository={panelRepository}>
        <Home />
      </PanelProvider>
    </ReadingProvider>
  )
}

export default App
