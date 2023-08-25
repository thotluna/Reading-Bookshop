import { BookBasic } from '@mod-catalogue/domain'
import { MutableRefObject, createContext } from 'react'

export const enum place {
  CATALOGUE = 'catalogue',
  READING = 'reading'
}

interface DndContext {
  bookDrag: MutableRefObject<BookBasic | undefined>
  reciveBook: MutableRefObject<BookBasic | undefined>
  placeBook: MutableRefObject<place | undefined>
}

export const dndContext = createContext({} as DndContext)
