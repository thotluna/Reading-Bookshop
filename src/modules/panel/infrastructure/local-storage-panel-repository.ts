import { PanelRepository, PanelState } from '@mod-panel/domain'

export function LocalStoragePanelRepository(): PanelRepository {
  return {
    get: () => get(),
    toggle: () => toggle()
  }
}

export const ITEM_PANEL = 'item-panel'

const get = (): PanelState => {
  const stateRaw = localStorage.getItem(ITEM_PANEL)
  if (!stateRaw) {
    return {
      panel: 'hidden'
    } satisfies PanelState
  }
  return JSON.parse(stateRaw)
}

const toggle = () => {
  const oldState = get()
  const state: PanelState = !oldState ? { panel: 'hidden' } : { panel: oldState.panel === 'show' ? 'hidden' : 'show' }

  const stateRaw = JSON.stringify(state)
  localStorage.setItem(ITEM_PANEL, stateRaw)
}
