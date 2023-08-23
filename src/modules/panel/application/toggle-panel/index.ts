import { PanelRepository } from '@mod-panel/domain'

export function TogglePanel(repository: PanelRepository) {
  return repository.toggle()
}
