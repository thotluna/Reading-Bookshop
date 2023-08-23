import { PanelState } from '.'

export interface PanelRepository {
  get: () => PanelState
  toggle: () => void
}
