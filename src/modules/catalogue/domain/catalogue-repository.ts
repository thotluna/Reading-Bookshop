import { Catalogue } from './models'

export interface CatalogueRepository {
  getCatalogue: () => Promise<Catalogue>
}
