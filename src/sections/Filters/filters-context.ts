import { FiltersState } from '@mod-catalogue/domain'
import { FiltersRepository } from '@mod-filters/domain'
import { createContext } from 'react'
import { FiltersActions } from './filters-reducers'

interface FiltersContext {
  filtersState: FiltersState
  dispatch: React.Dispatch<FiltersActions>
  repository: FiltersRepository
}

export const filtersContext = createContext<FiltersContext>({} as FiltersContext)
