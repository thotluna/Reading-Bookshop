import { BookBasic, Catalogue, CatalogueRepository } from '@mod-catalogue/domain'
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
    const books = BookMother.createList(count ?? 5).map((b: BookBasic) => b) satisfies BookBasic[]
    const catalogue = {
      books: state ? state.books : books,
      total: state ? state.total : books.length,
      available: state ? state.available : books.length
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
    } satisfies CatalogueRepository

    return {
      ...repository,
      ...partial
    }
  }
}
