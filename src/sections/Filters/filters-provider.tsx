import { FiltersState } from '@mod-catalogue/domain'
import { GetFilters } from '@mod-filters/application'
import { FiltersRepository } from '@mod-filters/domain'
import { useReducer } from 'react'
import { filtersContext } from './filters-context'
import { filtersReducer } from './filters-reducers'

const getInitialFilters = (repository: FiltersRepository) => {
  return GetFilters(repository)
}

interface Props {
  children: JSX.Element | JSX.Element[]
  repository: FiltersRepository
}

export function FiltersProvider({ children, repository }: Props) {
  const [filtersState, dispatch] = useReducer(filtersReducer, getInitialFilters(repository) satisfies FiltersState)

  return <filtersContext.Provider value={{ filtersState, dispatch, repository }}>{children}</filtersContext.Provider>
}
