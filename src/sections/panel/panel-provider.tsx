import { PanelRepository } from '@mod-panel/domain'
import { ReactNode, useState } from 'react'
import { panelContext } from './panel-context'

const INITIAL_PANEL = (repository: PanelRepository) => {
  return repository.get()
}

export function PanelProvider({ children, repository }: { children: ReactNode; repository: PanelRepository }) {
  const [statePanel, setStatePanel] = useState(() => INITIAL_PANEL(repository))
  return <panelContext.Provider value={{ statePanel, setStatePanel, repository }}>{children}</panelContext.Provider>
}
