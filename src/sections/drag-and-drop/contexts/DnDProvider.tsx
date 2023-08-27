import { BookBasic } from '@mod-catalogue/domain'
import { Zones } from '@shared/constants'
import { ReactNode, useRef } from 'react'
import { dndContext } from './DndContext'

export function DnDProvider({ children }: { children: ReactNode }) {
  const bookDrag = useRef<BookBasic>()
  const receiveBook = useRef<BookBasic>()
  const placeBook = useRef<Zones | undefined>()

  return <dndContext.Provider value={{ bookDrag, receiveBook, placeBook }}>{children}</dndContext.Provider>
}
