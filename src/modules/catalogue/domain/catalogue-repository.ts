import { FiltersState } from '@mod-filters/domain'
import { Catalogue } from './catalogue'

export interface CatalogueRepository {
  getCatalogue: (filters?: FiltersState) => Promise<Catalogue>
}
