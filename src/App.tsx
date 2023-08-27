import { PanelRepository } from '@mod-panel/domain'
import { LocalStoragePanelRepository } from '@mod-panel/infrastructure'
import { ReadingRepository } from '@mod-reading/domain'
import { LocalStorageReadingRepository } from '@mod-reading/infrastructure'
import { DnDProvider } from '@sec-dnd/contexts/DnDProvider'
import { PanelProvider } from '@sec-panel/panel-provider'
import { ReadingProvider } from '@sec-reading/context'
import { useMemo } from 'react'
import { Home } from './Home'

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
