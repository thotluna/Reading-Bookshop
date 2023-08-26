import { PanelRepository } from '@mod-panel/domain'
import { LocalStoragePanelRepository } from '@mod-panel/infrastructure'
import { ReadingRepository } from '@mod-reading/domain'
import { LocalStorageReadingRepository } from '@mod-reading/infrastructure'
import { ReadingProvider } from '@sec-reading/context'
import { DnDProvider } from '@sec-reading/context/DnDProvider'
import { useMemo } from 'react'
import { Home } from './Home'
import { PanelProvider } from './sections/panel/panel-provider'

function App() {
  const readingRepository: ReadingRepository = useMemo(() => LocalStorageReadingRepository(), [])
  const panelRepository: PanelRepository = useMemo(() => LocalStoragePanelRepository(), [])
  return (
    <ReadingProvider repository={readingRepository}>
      <DnDProvider>
        <PanelProvider repository={panelRepository}>
          <Home />
        </PanelProvider>
      </DnDProvider>
    </ReadingProvider>
  )
}

export default App
