import { CatalogueRepository } from '../../domain/catalogue-repository'
import { Catalogue, FiltersState } from '../../domain/models'

export const GetCatalogue = (repository: CatalogueRepository, filters?: FiltersState): Promise<Catalogue> => {
  return repository.getCatalogue(filters)
}
