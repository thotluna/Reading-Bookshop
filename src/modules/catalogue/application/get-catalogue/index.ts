import { CatalogueRepository } from '../../domain/catalogue-repository'
import { Catalogue } from '../../domain/models'

export const GetCatalogue = (repository: CatalogueRepository): Promise<Catalogue> => {
  return repository.getCatalogue()
}
