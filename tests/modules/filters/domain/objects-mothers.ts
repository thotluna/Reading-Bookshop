import { FiltersState } from '@mod-catalogue/domain'
import { FiltersRepository } from '@mod-filters/domain'
import { vi } from 'vitest'

type partialFiltersState = Partial<FiltersState>

export class FiltersStateObjectMother {
  static create(partial: partialFiltersState): FiltersState {
    const state = {
      genders: [],
      nPages: 0
    } satisfies FiltersState

    return {
      ...state,
      ...partial
    }
  }
}

type partialFiltersrepository = Partial<FiltersRepository>

export class FiltersRepositoryObjectMother {
  static create({
    partial,
    state = FiltersStateObjectMother.create({})
  }: {
    partial?: partialFiltersrepository
    state?: partialFiltersState
  }): FiltersRepository {
    const repository = {
      get: vi.fn().mockReturnValue(state),
      save: vi.fn()
    } as FiltersRepository

    return {
      ...repository,
      ...partial
    } as FiltersRepository
  }
}
