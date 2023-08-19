import { Gender } from '@/modules/catalogue/domain'
import { ReactComponent as SearchIcon } from '@assets/search.svg'

const GENDERS: Gender[] = ['Fantasía', 'Ciencia ficción', 'Zombies', 'Terror']
interface Props {
  nPage: number
  isChecked: (gender: Gender) => boolean
  onChangeGender: (gender: Gender) => void
  onChangePage: (nPage: number) => void
  search: string
  setSearch: (search: string) => void
}

export function Filters({ nPage, isChecked, onChangeGender, onChangePage, search, setSearch }: Props) {
  return (
    <article className=" py-8 flex flex-col gap-1">
      <div className="flex flex-wrap gap-3">
        <ul className="flex flex-wrap items-center gap-2">
          {GENDERS.map((gender) => (
            <li key={gender} className="flex items-center justify-center gap-2">
              <input type="checkbox" id={gender} onChange={() => onChangeGender(gender)} checked={isChecked(gender)} />
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
            step={nPage < 100 ? 10 : 100}
            value={nPage}
            onChange={(event) => onChangePage(Number(event.target.value))}
          />
          <span>{nPage} paginas</span>
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
