import { FiltersState } from '@mod-catalogue/domain'

export interface FiltersRepository {
  get: () => FiltersState
  save: (filtersState: FiltersState) => void
}
