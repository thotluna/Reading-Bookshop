import { BookCatalogue } from '@mod-catalogue/domain'
import { ReactNode, useRef } from 'react'
import { dndContext, place } from './DndContext'

export function DnDProvider({ children }: { children: ReactNode }) {
  const bookDrag = useRef<BookCatalogue>()
  const reciveBook = useRef<BookCatalogue>()
  const placeBook = useRef<place | undefined>()

  return <dndContext.Provider value={{ bookDrag, reciveBook, placeBook }}>{children}</dndContext.Provider>
}
