import { Gender } from '@/modules/catalogue/domain'
import React from 'react'

const GENDERS: Gender[] = ['Fantasía', 'Ciencia ficción', 'Zombies', 'Terror']
interface Props {
  nPage: number
  isChecked: (gender: Gender) => boolean
  onChangeGender: (gender: Gender) => void
  onChangePage: (nPage: number) => void
}

export function Filters({ nPage, isChecked, onChangeGender, onChangePage }: Props) {
  return (
    <div className="flex gap-3">
      <ul className="flex items-center gap-2">
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
  )
}
