import { FiltersRepository, FiltersState } from '../domain'

export function LocalStorageFiltersRepository(): FiltersRepository {
  return {
    get: () => get(),
    save: (filtersState: FiltersState) => save(filtersState)
  }
}

export const ITEM_FILTERS = 'item-filters'

const get = () => {
  const stateRaw = localStorage.getItem(ITEM_FILTERS)
  if (!stateRaw)
    return {
      genders: [],
      nPages: 0,
      search: undefined
    } satisfies FiltersState

  const state = JSON.parse(stateRaw)
  return state as FiltersState
}

const save = (filtersState: FiltersState): void => {
  const stateRaw = JSON.stringify(filtersState)
  localStorage.setItem(ITEM_FILTERS, stateRaw)
}
