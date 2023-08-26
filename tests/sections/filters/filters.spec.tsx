import { GENDERS } from '@mod-catalogue/domain'
import { CatalogueComponent } from '@sec-catalogue/CatalogueComponent'
import { FiltersProvider } from '@sec-filters/filters-provider'
import { ReadingProvider } from '@sec-reading/context'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe } from 'vitest'
import { CatalogueObjectMother, CatalogueRepositoryObjectMother } from '../../modules/catalogue/domain/object-mother'
import { FiltersRepositoryObjectMother, FiltersStateObjectMother } from '../../modules/filters/domain/objects-mothers'
import { ReadingRepositoryObjectMother } from '../../modules/reading/domain/models'

describe('Filters', () => {
  test('should render gender filter, page filter and search filter', () => {
    const filtersRepository = FiltersRepositoryObjectMother.create({})
    const catalogueRepository = CatalogueRepositoryObjectMother.create({
      state: CatalogueObjectMother.create({ count: 5 })
    })

    const readingRepository = ReadingRepositoryObjectMother.create({})
    render(
      <FiltersProvider repository={filtersRepository}>
        <ReadingProvider repository={readingRepository}>
          <CatalogueComponent repository={catalogueRepository} />
        </ReadingProvider>
      </FiltersProvider>
    )

    waitFor(async () => {
      GENDERS.forEach((gender) => {
        expect(screen.queryByLabelText(gender)).toBeInTheDocument()
      })

      expect(screen.queryByLabelText(/Max Paginas/)).toBeInTheDocument()
      expect(screen.queryByLabelText(/Búsqueda/)).toBeInTheDocument()
    })
  })
  test('should send filters to gender select', () => {
    const filtersRepository = FiltersRepositoryObjectMother.create({})
    const catalogueRepository = CatalogueRepositoryObjectMother.create({
      state: CatalogueObjectMother.create({ count: 5 })
    })

    const spyGet = vi.spyOn(filtersRepository, 'get')
    const spySave = vi.spyOn(filtersRepository, 'save')

    const readingRepository = ReadingRepositoryObjectMother.create({})
    render(
      <FiltersProvider repository={filtersRepository}>
        <ReadingProvider repository={readingRepository}>
          <CatalogueComponent repository={catalogueRepository} />
        </ReadingProvider>
      </FiltersProvider>
    )

    const fantasy = screen.queryByLabelText('Fantasía')
    fireEvent.click(fantasy!)

    expect(spyGet).toHaveBeenCalledWith()
    expect(spySave).toHaveBeenCalledWith(FiltersStateObjectMother.create({}))
    expect(spySave).toHaveBeenCalledWith(FiltersStateObjectMother.create({ genders: ['Fantasía'] }))
  })
  test('should send filters to max pages select', () => {
    const filtersRepository = FiltersRepositoryObjectMother.create({})
    const catalogueRepository = CatalogueRepositoryObjectMother.create({
      state: CatalogueObjectMother.create({ count: 5 })
    })

    const spyGet = vi.spyOn(filtersRepository, 'get')
    const spySave = vi.spyOn(filtersRepository, 'save')

    const readingRepository = ReadingRepositoryObjectMother.create({})
    render(
      <FiltersProvider repository={filtersRepository}>
        <ReadingProvider repository={readingRepository}>
          <CatalogueComponent repository={catalogueRepository} />
        </ReadingProvider>
      </FiltersProvider>
    )

    const slider: HTMLInputElement = screen.getByRole('slider', { name: /Max Paginas:/ })
    fireEvent.change(slider, { target: { value: 170 } })

    expect(spyGet).toHaveBeenCalledWith()
    expect(spySave).toHaveBeenCalledWith(FiltersStateObjectMother.create({}))
    expect(spySave).toHaveBeenCalledWith(FiltersStateObjectMother.create({ nPages: 170 }))
  })

  test('should send filters to search select', () => {
    const filtersRepository = FiltersRepositoryObjectMother.create({})
    const catalogueRepository = CatalogueRepositoryObjectMother.create({
      state: CatalogueObjectMother.create({ count: 5 })
    })

    const spyGet = vi.spyOn(filtersRepository, 'get')
    const spySave = vi.spyOn(filtersRepository, 'save')

    const readingRepository = ReadingRepositoryObjectMother.create({})
    render(
      <FiltersProvider repository={filtersRepository}>
        <ReadingProvider repository={readingRepository}>
          <CatalogueComponent repository={catalogueRepository} />
        </ReadingProvider>
      </FiltersProvider>
    )

    const searchElement: HTMLInputElement = screen.getByRole('textbox', { name: /Búsqueda/i })
    expect(searchElement).toBeInTheDocument()
    const search = 'todo'
    fireEvent.change(searchElement, { target: { value: search } })

    waitFor(
      () => {
        expect(screen.getByText(search)).toBeInTheDocument()
        expect(spyGet).toHaveBeenCalledWith()
        expect(spySave).toHaveBeenCalledTimes(2)
        expect(spySave).toHaveBeenCalledWith(FiltersStateObjectMother.create({}))
        expect(spySave).toHaveBeenCalledWith(FiltersStateObjectMother.create({ search }))
      },
      { timeout: 300 }
    )
  })
})
