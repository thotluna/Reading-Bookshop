import { PanelRepository } from '@mod-panel/domain'

export function GetPanel(repository: PanelRepository) {
  return repository.get()
}
