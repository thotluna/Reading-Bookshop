import { FiltersState } from '@mod-catalogue/domain'
import { FiltersRepository } from '@mod-filters/domain'

export function GetFilters(repository: FiltersRepository): FiltersState {
  return repository.get()
}
