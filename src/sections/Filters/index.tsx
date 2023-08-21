import { ReactComponent as SearchIcon } from '@assets/search.svg'
import { Gender } from '@mod-catalogue/domain'
import { useEffect, useState } from 'react'
import { useFilters } from './use-filters'

const GENDERS: Gender[] = ['Fantasía', 'Ciencia ficción', 'Zombies', 'Terror']

export function Filters() {
  const { filtersState, addSearch, addNPages, toggleGender, exists } = useFilters()
  const [search, setSearch] = useState<string>(' ')

  useEffect(() => {
    const timeout = setTimeout(() => {
      addSearch(search)
    }, 500)

    return () => clearTimeout(timeout)
  }, [search, addSearch])

  return (
    <article className=" py-8 flex flex-col gap-1">
      <div className="flex flex-wrap gap-3">
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
      </div>
      <div className="flex items-center gap-1">
        <label htmlFor="search">Busqueda:</label>
        <input id="search" type="text" value={search} onChange={(event) => setSearch(event.target.value)} />
        <button className="">
          <SearchIcon width={18} height={18} aria-label="search" />
        </button>
      </div>
    </article>
  )
}
