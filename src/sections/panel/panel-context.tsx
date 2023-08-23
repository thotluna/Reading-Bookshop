import { PanelRepository, PanelState } from '@mod-panel/domain'
import { createContext } from 'react'

interface PanelContext {
  statePanel: PanelState
  setStatePanel: React.Dispatch<React.SetStateAction<PanelState>>
  repository: PanelRepository
}

export const panelContext = createContext({} as PanelContext)
