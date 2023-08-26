import { GetPanel, TogglePanel } from '@mod-panel/application'
import { ITEM_PANEL } from '@mod-panel/infrastructure'
import { useContext, useEffect } from 'react'
import { panelContext } from './panel-context'

export function usePanel() {
  const { statePanel, repository, setStatePanel } = useContext(panelContext)

  const togglePanel = () => {
    setStatePanel((prev) => {
      return {
        panel: prev.panel === 'show' ? 'hidden' : 'show'
      }
    })

    TogglePanel(repository)
  }

  useEffect(() => {
    const handler = (event: StorageEvent) => {
      if (event.key !== ITEM_PANEL) return
      const state = GetPanel(repository)
      if (state.panel === statePanel.panel) return
      setStatePanel(state)
    }

    window.addEventListener('storage', handler)

    return () => window.removeEventListener('storage', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repository])

  return {
    panel: statePanel.panel,
    togglePanel
  }
}
