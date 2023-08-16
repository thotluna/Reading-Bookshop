import { Catalogue, FiltersState } from './models'

export interface CatalogueRepository {
  getCatalogue: (filters?: FiltersState) => Promise<Catalogue>
}
