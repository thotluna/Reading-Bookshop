import { ReactComponent as SearchIcon } from '@assets/search.svg'
import { GENDERS } from '@mod-catalogue/domain'
import { memo, useEffect, useState } from 'react'
import { useFilters } from './use-filters'

export function Filters() {
  const { filtersState, addSearch, addNPages, toggleGender, exists } = useFilters()
  const [search, setSearch] = useState<string>(' ')

  useEffect(() => {
    const timeout = setTimeout(() => {
      addSearch(search)
    }, 200)

    return () => clearTimeout(timeout)
  }, [search, addSearch])

  return (
    <article className=" p-4 my-4 flex flex-wrap justify-between gap-4 rounded-md border-2 border-blue-500">
      {/* <div className="flex flex-wrap gap-3"> */}
      <ul className="flex flex-wrap items-center gap-2">
        {GENDERS.map((gender) => (
          <li key={gender} className="flex items-center justify-center gap-2">
            <input type="checkbox" id={gender} onChange={() => toggleGender(gender)} checked={exists(gender)} />
            <label htmlFor={gender}>{gender}</label>
          </li>
        ))}
      </ul>
      <div data-testid="filter-pages" className="flex items-center gap-1">
        <label className="inline pr-1" htmlFor="range">
          Max Paginas:
        </label>
        <input
          className="inline"
          id="range"
          type="range"
          min={10}
          max={2000}
          step={filtersState.nPages < 100 ? 10 : 100}
          value={filtersState.nPages}
          onChange={(event) => addNPages(Number(event.target.value))}
        />
        <span>{filtersState.nPages} paginas</span>
      </div>
      {/* </div> */}
      <div className="flex items-center gap-1">
        <label htmlFor="search">Búsqueda:</label>
        <input id="search" type="text" value={search} onChange={(event) => setSearch(event.target.value)} />
        <button className="">
          <SearchIcon width={18} height={18} aria-label="search" />
        </button>
      </div>
    </article>
  )
}

export const FilterComponent = memo(Filters)
