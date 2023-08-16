import { Gender } from '@/modules/catalogue/domain'
import { ReactComponent as SearchIcon } from '@assets/search.svg'
import React from 'react'

const GENDERS: Gender[] = ['Fantasía', 'Ciencia ficción', 'Zombies', 'Terror']
interface Props {
  nPage: number
  isChecked: (gender: Gender) => boolean
  onChangeGender: (gender: Gender) => void
  onChangePage: (nPage: number) => void
  onSearch: (search: string) => void
  search: string
  setSearch: (search: string) => void
}

export function Filters({ nPage, isChecked, onChangeGender, onChangePage, onSearch, search, setSearch }: Props) {
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.currentTarget

    const search = target.search.value

    onSearch(search)
  }

  return (
    <article className="px-8 pb-4 flex flex-col gap-1">
      <div className="flex flex-wrap gap-3">
        <ul className="flex flex-wrap items-center gap-2">
          {GENDERS.map((gender) => (
            <li key={gender} className="flex items-center justify-center gap-2">
              <input type="checkbox" id={gender} onChange={() => onChangeGender(gender)} checked={isChecked(gender)} />
              <label htmlFor={gender}>{gender}</label>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <label className="inline pr-1" htmlFor="range-component">
            Max Paginas:
          </label>
          <input
            className="inline"
            id="rage-component"
            type="range"
            min={10}
            max={2000}
            step={nPage < 100 ? 10 : 100}
            value={nPage}
            onChange={(event) => onChangePage(Number(event.target.value))}
          />
        </div>
      </div>
      <form className="flex items-center gap-1" onSubmit={(event) => onSubmitHandler(event)}>
        <label htmlFor="search">Busqueda:</label>
        <input id="search" type="text" value={search} onChange={(event) => setSearch(event.target.value)} />
        <button className="">
          <SearchIcon width={18} height={18} aria-label="search" />
        </button>
      </form>
    </article>
  )
}
