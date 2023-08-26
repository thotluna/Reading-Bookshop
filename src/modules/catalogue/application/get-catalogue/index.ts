import { Catalogue } from '@mod-catalogue/domain'
import { FiltersState } from '@mod-filters/domain'
import { CatalogueRepository } from '../../domain/catalogue-repository'

export const GetCatalogue = (repository: CatalogueRepository, filters?: FiltersState): Promise<Catalogue> => {
  return repository.getCatalogue(filters)
}
