import { BookBasic } from '@mod-catalogue/domain'

export interface BookWithPosition extends BookBasic {
  position: number
}
