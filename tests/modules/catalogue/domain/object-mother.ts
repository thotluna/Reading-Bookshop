import { BookCatalogue, Catalogue, CatalogueRepository } from '@mod-catalogue/domain'
import { BookMother } from './models'

type PartialCatalogue = Partial<Catalogue>

export class CatalogueObjectMother {
  static create({
    partial,
    state,
    count
  }: {
    partial?: PartialCatalogue
    state?: Catalogue
    count?: number
  }): Catalogue {
    const books = BookMother.createList(count ?? 5).map((b: BookCatalogue) => b) satisfies BookCatalogue[]
    const catalogue = {
      books: state ? state.books : books,
      total: state ? state.total : books.length,
      avalaible: state ? state.avalaible : books.length
    }
    return {
      ...catalogue,
      ...partial
    } satisfies Catalogue
  }
}

type partialCatalogueRepository = Partial<CatalogueRepository>

export class CatalogueRepositoryObjectMother {
  static create({
    partial,
    state = CatalogueObjectMother.create({})
  }: {
    partial?: partialCatalogueRepository
    state?: PartialCatalogue
  }): CatalogueRepository {
    const repository = {
      getCatalogue: vi.fn().mockResolvedValue(state)
    }

    return {
      ...repository,
      ...partial
    }
  }
}
