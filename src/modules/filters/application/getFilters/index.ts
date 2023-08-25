import { FiltersRepository, FiltersState } from '@mod-filters/domain'

export function GetFilters(repository: FiltersRepository): FiltersState {
  return repository.get()
}
