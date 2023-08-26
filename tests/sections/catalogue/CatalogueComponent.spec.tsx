import { CatalogueComponent } from '@sec-catalogue/CatalogueComponent'
import { ReadingProvider } from '@sec-reading/context'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, vi } from 'vitest'
import { FiltersProvider } from '../../../src/sections/Filters/filters-provider'
import { CatalogueObjectMother, CatalogueRepositoryObjectMother } from '../../modules/catalogue/domain/object-mother'
import { FiltersRepositoryObjectMother, FiltersStateObjectMother } from '../../modules/filters/domain/objects-mothers'
import { ReadingRepositoryObjectMother } from '../../modules/reading/domain/models'

describe('CatalogueComponent', () => {
  it('should render title', async () => {
    const repository = CatalogueRepositoryObjectMother.create({})

    const filtersRepository = FiltersRepositoryObjectMother.create({})
    const readingRepository = ReadingRepositoryObjectMother.create({})
    render(
      <FiltersProvider repository={filtersRepository}>
        <ReadingProvider repository={readingRepository}>
          <CatalogueComponent repository={repository} />
        </ReadingProvider>
      </FiltersProvider>
    )

    await waitFor(async () => {
      const title = screen.queryByText(/catalogo/i)
      expect(title).toBeInTheDocument()

      expect(screen.queryByText(/disponibles:/i)).toHaveTextContent(' 0/0')
    })
  })

  describe('without books', () => {
    it('should render the total and available book count to 0', async () => {
      const repository = CatalogueRepositoryObjectMother.create({ state: CatalogueObjectMother.create({ count: 0 }) })

      const filtersRepository = FiltersRepositoryObjectMother.create({})
      const readingRepository = ReadingRepositoryObjectMother.create({})
      render(
        <FiltersProvider repository={filtersRepository}>
          <ReadingProvider repository={readingRepository}>
            <CatalogueComponent repository={repository} />
          </ReadingProvider>
        </FiltersProvider>
      )

      const available = await screen.findByText(/disponibles:/i)
      expect(available).toHaveTextContent(' 0/0')
    })

    it('should render the messages of not having books available', async () => {
      const repository = CatalogueRepositoryObjectMother.create({ state: CatalogueObjectMother.create({ count: 0 }) })

      const filtersRepository = FiltersRepositoryObjectMother.create({})
      const readingRepository = ReadingRepositoryObjectMother.create({})
      render(
        <FiltersProvider repository={filtersRepository}>
          <ReadingProvider repository={readingRepository}>
            <CatalogueComponent repository={repository} />
          </ReadingProvider>
        </FiltersProvider>
      )

      const title = await screen.findByText('Uff! Actualmente no contamos con libros disponibles.')
      expect(title).toBeInTheDocument()
      const subTitle = await screen.findByText('Podrías modificar los filtros para mejorar la búsqueda.')
      expect(subTitle).toBeInTheDocument()
    })
  })
  describe('with books', () => {
    it('should render the total and available book count', async () => {
      const count = 5
      const repository = CatalogueRepositoryObjectMother.create({ state: CatalogueObjectMother.create({ count }) })

      const filtersRepository = FiltersRepositoryObjectMother.create({})
      const readingRepository = ReadingRepositoryObjectMother.create({})
      render(
        <FiltersProvider repository={filtersRepository}>
          <ReadingProvider repository={readingRepository}>
            <CatalogueComponent repository={repository} />
          </ReadingProvider>
        </FiltersProvider>
      )

      await screen.findAllByRole('button', { name: /agregar/i })

      const available = await screen.findByText(/disponibles:/i)

      expect(available).toHaveTextContent(` ${count}/${count}`)
    })

    describe('having', () => {
      it('gender filters, should render a book list', async () => {
        const count = 5
        const repository = CatalogueRepositoryObjectMother.create({ state: CatalogueObjectMother.create({ count }) })
        const spy = vi.spyOn(repository, 'getCatalogue')

        const filtersRepository = FiltersRepositoryObjectMother.create({
          partial: {
            get: vi
              .fn()
              .mockReturnValueOnce(FiltersStateObjectMother.create({}))
              .mockReturnValue(FiltersStateObjectMother.create({ genders: ['Fantasía'] }))
              .mockReturnValueOnce(FiltersStateObjectMother.create({}))
          }
        })
        const readingRepository = ReadingRepositoryObjectMother.create({})
        render(
          <FiltersProvider repository={filtersRepository}>
            <ReadingProvider repository={readingRepository}>
              <CatalogueComponent repository={repository} />
            </ReadingProvider>
          </FiltersProvider>
        )

        const genderFantasy = screen.queryByLabelText('Fantasía')
        expect(genderFantasy).toBeInTheDocument()
        fireEvent.click(genderFantasy!)
        fireEvent.click(genderFantasy!)

        await waitFor(async () => {
          expect(spy).toHaveBeenCalledTimes(4)
          expect(spy).toHaveBeenCalledWith(FiltersStateObjectMother.create({}))
          expect(spy).toHaveBeenNthCalledWith(2, FiltersStateObjectMother.create({ genders: ['Fantasía'] }))
          expect(spy).toHaveBeenLastCalledWith(FiltersStateObjectMother.create({}))
        })
      })

      it('page filters, should render a book list', async () => {
        const count = 5
        const repository = CatalogueRepositoryObjectMother.create({ state: CatalogueObjectMother.create({ count }) })

        const spy = vi.spyOn(repository, 'getCatalogue')

        const filtersRepository = FiltersRepositoryObjectMother.create({})
        const readingRepository = ReadingRepositoryObjectMother.create({})
        render(
          <FiltersProvider repository={filtersRepository}>
            <ReadingProvider repository={readingRepository}>
              <CatalogueComponent repository={repository} />
            </ReadingProvider>
          </FiltersProvider>
        )

        const slider: HTMLInputElement = screen.getByRole('slider', { name: /Max Paginas:/ })
        fireEvent.change(slider, { target: { value: 170 } })
        await waitFor(async () => {
          expect(spy).toHaveBeenCalledTimes(2)
          expect(spy).toHaveBeenCalledWith(FiltersStateObjectMother.create({}))
          expect(spy).toHaveBeenLastCalledWith(FiltersStateObjectMother.create({ nPages: 170 }))
        })
      })

      it('search filters, should render a book list', async () => {
        const search = 'search'

        const count = 5
        const repository = CatalogueRepositoryObjectMother.create({ state: CatalogueObjectMother.create({ count }) })
        const spy = vi.spyOn(repository, 'getCatalogue')

        const filtersRepository = FiltersRepositoryObjectMother.create({})
        const readingRepository = ReadingRepositoryObjectMother.create({})
        render(
          <FiltersProvider repository={filtersRepository}>
            <ReadingProvider repository={readingRepository}>
              <CatalogueComponent repository={repository} />
            </ReadingProvider>
          </FiltersProvider>
        )

        const searchElement: HTMLInputElement = screen.getByRole('textbox', { name: /Búsqueda/i })
        expect(searchElement).toBeInTheDocument()
        fireEvent.change(searchElement, { target: { value: search } })
        await waitFor(async () => {
          expect(spy).toHaveBeenCalledTimes(2)
          expect(spy).toHaveBeenCalledWith(FiltersStateObjectMother.create({}))
          expect(spy).toHaveBeenLastCalledWith(FiltersStateObjectMother.create({ search }))
        })
      })

      it('all filters, should render a book list', async () => {
        const gender = 'Fantasía'
        const pages = 100
        const search = 'a'
        const count = 5
        const repository = CatalogueRepositoryObjectMother.create({ state: CatalogueObjectMother.create({ count }) })

        const spy = vi.spyOn(repository, 'getCatalogue')

        const filtersRepository = FiltersRepositoryObjectMother.create({})
        const readingRepository = ReadingRepositoryObjectMother.create({})
        render(
          <FiltersProvider repository={filtersRepository}>
            <ReadingProvider repository={readingRepository}>
              <CatalogueComponent repository={repository} />
            </ReadingProvider>
          </FiltersProvider>
        )

        const genderFantasy = screen.queryByLabelText(gender)
        expect(genderFantasy).toBeInTheDocument()
        fireEvent.click(genderFantasy!)

        const slider: HTMLInputElement = screen.getByRole('slider', { name: /Max Paginas:/ })
        fireEvent.change(slider, { target: { value: pages } })

        const searchElement: HTMLInputElement = screen.getByRole('textbox', { name: /Búsqueda/i })
        expect(searchElement).toBeInTheDocument()
        fireEvent.change(searchElement, { target: { value: search } })

        await waitFor(async () => {
          expect(spy).toHaveBeenCalledTimes(4)
          expect(spy).toHaveBeenCalledWith(FiltersStateObjectMother.create({}))
          expect(spy).toHaveBeenNthCalledWith(2, FiltersStateObjectMother.create({ genders: [gender] }))
          expect(spy).toHaveBeenNthCalledWith(3, FiltersStateObjectMother.create({ genders: [gender], nPages: pages }))
          expect(spy).toHaveBeenNthCalledWith(
            4,
            FiltersStateObjectMother.create({ genders: [gender], nPages: pages, search })
          )
        })
      })
    })
  })
})
