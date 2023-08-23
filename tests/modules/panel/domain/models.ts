import { PanelRepository, PanelState } from '@mod-panel/domain'

export class PanelStateObjectMother {
  static create({ panel = 'hidden' }: { panel: 'hidden' | 'show' }): PanelState {
    return {
      panel
    }
  }
}

type partialPanelRepository = Partial<PanelRepository>

export class PanelRepositoryObjectMother {
  static create({
    partial,
    panelState = { panel: 'hidden' }
  }: {
    partial?: partialPanelRepository
    panelState?: PanelState
  }): PanelRepository {
    const repository = {
      get: vi.fn().mockReturnValue(panelState),
      toggle: vi.fn()
    } satisfies PanelRepository

    return {
      ...repository,
      ...partial
    } satisfies PanelRepository
  }
}
