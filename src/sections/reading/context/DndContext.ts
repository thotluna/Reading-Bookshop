import { BookBasic } from '@mod-catalogue/domain'
import { Zones } from '@shared/constants'
import { MutableRefObject, createContext } from 'react'

interface DndContext {
  bookDrag: MutableRefObject<BookBasic | undefined>
  receiveBook: MutableRefObject<BookBasic | undefined>
  placeBook: MutableRefObject<Zones | undefined>
}

export const dndContext = createContext({} as DndContext)
