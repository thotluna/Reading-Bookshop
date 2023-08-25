import { FiltersRepository, FiltersState } from '@mod-filters/domain'

export function SaveFilters(repository: FiltersRepository, filtersState: FiltersState): void {
  return repository.save(filtersState)
}
