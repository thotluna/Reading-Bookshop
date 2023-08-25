import { Catalogue } from './catalogue'
import { FiltersState } from './models'

export interface CatalogueRepository {
  getCatalogue: (filters?: FiltersState) => Promise<Catalogue>
}
