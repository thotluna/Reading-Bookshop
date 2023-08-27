import { BookBasic } from '@mod-catalogue/domain'
import { Zones } from '@shared/constants'
import { ReactNode } from 'react'
import { useDnD } from './hooks/useDnd'

interface Props {
  book: BookBasic
  zone: Zones
  onSortAndSave: (goal: BookBasic, displace: BookBasic | undefined, zone: Zones | undefined) => void
  children: ReactNode
}

export function DragComponent({ book, zone, onSortAndSave, children }: Props) {
  const { onDragEnd, onDragEnter, onDragOver, onDragStart } = useDnD(onSortAndSave)

  return (
    <div
      className={`drag-and-drop cursor-move`}
      draggable
      onDragStart={() => {
        onDragStart(book)
      }}
      onDragEnter={() => {
        onDragEnter(book)
      }}
      onDragEnd={() => {
        onDragEnd()
      }}
      onDragOver={(e) => {
        e.preventDefault()
        onDragOver(zone)
      }}
    >
      {children}
    </div>
  )
}
