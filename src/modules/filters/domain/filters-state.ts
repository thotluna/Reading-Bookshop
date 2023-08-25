import { Gender } from '@mod-catalogue/domain'

export interface FiltersState {
  genders: Gender[]
  nPages: number
  search?: string
}
