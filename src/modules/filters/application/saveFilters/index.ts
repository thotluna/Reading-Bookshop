import { FiltersState } from '@mod-catalogue/domain'
import { FiltersRepository } from '@mod-filters/domain'

export function SaveFilters(repository: FiltersRepository, filtersState: FiltersState): void {
  return repository.save(filtersState)
}
