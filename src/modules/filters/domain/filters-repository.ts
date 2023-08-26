import { FiltersState } from '.'

export interface FiltersRepository {
  get: () => FiltersState
  save: (filtersState: FiltersState) => void
}
