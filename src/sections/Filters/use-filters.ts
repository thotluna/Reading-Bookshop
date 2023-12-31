import { Gender } from '@mod-catalogue/domain'
import { SaveFilters } from '@mod-filters/application'
import { ITEM_FILTERS } from '@mod-filters/infrastructure'
import { useCallback, useContext, useEffect } from 'react'
import { filtersContext } from './filters-context'

export function useFilters() {
  const { filtersState, dispatch, repository } = useContext(filtersContext)

  const exists = useCallback(
    (gender: Gender) => {
      return filtersState.genders.includes(gender)
    },
    [filtersState.genders]
  )

  const toggleGender = useCallback(
    (gender: Gender): void => {
      exists(gender)
        ? dispatch({ type: 'delGender', payload: gender })
        : dispatch({ type: 'addGender', payload: gender })
    },
    [dispatch, exists]
  )

  const addNPages = useCallback(
    (nPages: number): void => {
      dispatch({ type: 'addNPages', payload: nPages })
    },
    [dispatch]
  )

  const addSearch = useCallback(
    (search: string): void => {
      dispatch({ type: 'addSearch', payload: search !== ' ' ? search : undefined })
    },
    [dispatch]
  )

  useEffect(() => {
    SaveFilters(repository, filtersState)
  }, [filtersState, repository])

  useEffect(() => {
    const handler = (event: StorageEvent) => {
      if (event.key !== ITEM_FILTERS) return
      const stateRow = event.newValue
      if (!stateRow) return
      const state = JSON.parse(stateRow)
      if (state === filtersState) return
      dispatch({ type: 'saveAll', payload: state })
    }
    window.addEventListener('storage', handler)

    return () => window.removeEventListener('storage', handler)
  }, [dispatch, filtersState])

  return {
    filtersState,
    exists,
    toggleGender,
    addNPages,
    addSearch
  }
}
