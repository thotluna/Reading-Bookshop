import { ReadingProvider } from '@sec-reading/context'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, vi } from 'vitest'
import { Book, Catalogue, CatalogueRepository } from '../../../src/modules/catalogue/domain'
import { FiltersProvider } from '../../../src/sections/Filters/filters-provider'
import { CatalogueComponent } from '../../../src/sections/catalogue'
import { BookMother } from '../../modules/catalogue/domain/models'
import { FiltersRepositoryObjectMother, FiltersStateObjectMother } from '../../modules/filters/domain/objects-mothers'
import { ReadingRepositoryObjectMother } from '../../modules/reading/domain/models'

describe('CatalogueComponent', () => {
  it('should render title', async () => {
    const state: Catalogue = {
      books: [],
      total: 0,
      avalaible: 0
    }
    const repository: CatalogueRepository = {
      getCatalogue: vi.fn().mockResolvedValue(Promise.resolve(state))
    }

    const filtersRepository = FiltersRepositoryObjectMother.create({})
    const readingRepository = ReadingRepositoryObjectMother.create({})
    render(
      <FiltersProvider repository={filtersRepository}>
        <ReadingProvider repository={readingRepository}>
          <CatalogueComponent repository={repository} toToggleBook={() => {}} />
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
      const state: Catalogue = {
        books: [],
        total: 0,
        avalaible: 0
      }
      const repository: CatalogueRepository = {
        getCatalogue: vi.fn().mockResolvedValue(Promise.resolve(state))
      }

      const filtersRepository = FiltersRepositoryObjectMother.create({})
      const readingRepository = ReadingRepositoryObjectMother.create({})
      render(
        <FiltersProvider repository={filtersRepository}>
          <ReadingProvider repository={readingRepository}>
            <CatalogueComponent repository={repository} toToggleBook={() => {}} />
          </ReadingProvider>
        </FiltersProvider>
      )

      const available = await screen.findByText(/disponibles:/i)
      expect(available).toHaveTextContent(' 0/0')
    })

    it('should render the messages of not having books available', async () => {
      const state: Catalogue = {
        books: [],
        total: 0,
        avalaible: 0
      }
      const repository: CatalogueRepository = {
        getCatalogue: vi.fn().mockResolvedValue(Promise.resolve(state))
      }

      const filtersRepository = FiltersRepositoryObjectMother.create({})
      const readingRepository = ReadingRepositoryObjectMother.create({})
      render(
        <FiltersProvider repository={filtersRepository}>
          <ReadingProvider repository={readingRepository}>
            <CatalogueComponent repository={repository} toToggleBook={() => {}} />
          </ReadingProvider>
        </FiltersProvider>
      )

      const title = await screen.findByText('Uff! Actualmente no contamos con libros disponibles.')
      expect(title).toBeInTheDocument()
      const subTitle = await screen.findByText('Podrias modificar los filtros para mejorar la busqueda.')
      expect(subTitle).toBeInTheDocument()
    })
  })
  describe('with books', () => {
    it('should render the total and available book count', async () => {
      const book = BookMother.createList(5)
      const state: Catalogue = {
        books: book,
        total: book.length,
        avalaible: book.length
      }
      const repository: CatalogueRepository = {
        getCatalogue: vi.fn().mockResolvedValue(Promise.resolve(state))
      }

      const filtersRepository = FiltersRepositoryObjectMother.create({})
      const readingRepository = ReadingRepositoryObjectMother.create({})
      render(
        <FiltersProvider repository={filtersRepository}>
          <ReadingProvider repository={readingRepository}>
            <CatalogueComponent repository={repository} toToggleBook={() => {}} />
          </ReadingProvider>
        </FiltersProvider>
      )

      await screen.findAllByRole('button', { name: /agregar/i })

      const available = await screen.findByText(/disponibles:/i)

      expect(available).toHaveTextContent(` ${book.length}/${book.length}`)
    })

    describe('having', () => {
      it('gender filters, should render a book list', async () => {
        const books = BookMother.createList(10)
        const bookFiltered = books.filter((book) => book.gender === 'Fantasía')
        const state: Catalogue = {
          books,
          total: books.length,
          avalaible: books.length
        }
        const repository: CatalogueRepository = {
          getCatalogue: vi
            .fn()
            .mockResolvedValueOnce(Promise.resolve(state))
            .mockResolvedValue(
              Promise.resolve({
                books: bookFiltered,
                total: books.length,
                avalaible: bookFiltered.length
              })
            )
        }

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
              <CatalogueComponent repository={repository} toToggleBook={() => {}} />
            </ReadingProvider>
          </FiltersProvider>
        )

        const genderFantasy = screen.queryByLabelText('Fantasía')
        expect(genderFantasy).toBeInTheDocument()
        fireEvent.click(genderFantasy!)
        fireEvent.click(genderFantasy!)

        await waitFor(async () => {
          const available = await screen.findByText(/disponibles:/i)
          expect(available).toHaveTextContent(` ${bookFiltered.length}/${books.length}`)

          expect(spy).toHaveBeenCalledTimes(4)
          expect(spy).toHaveBeenCalledWith(FiltersStateObjectMother.create({}))
          expect(spy).toHaveBeenNthCalledWith(2, FiltersStateObjectMother.create({ genders: ['Fantasía'] }))
          expect(spy).toHaveBeenLastCalledWith(FiltersStateObjectMother.create({}))
        })
      })

      it('page filters, should render a book list', async () => {
        const books = BookMother.createList(10)
        const bookFiltered = books.filter((book) => book.pages === books[0].pages)
        const state: Catalogue = {
          books,
          total: books.length,
          avalaible: books.length
        }
        const repository: CatalogueRepository = {
          getCatalogue: vi
            .fn()
            .mockResolvedValueOnce(Promise.resolve(state))
            .mockResolvedValue(
              Promise.resolve({
                books: bookFiltered,
                total: books.length,
                avalaible: bookFiltered.length
              })
            )
        }

        const spy = vi.spyOn(repository, 'getCatalogue')

        const filtersRepository = FiltersRepositoryObjectMother.create({})
        const readingRepository = ReadingRepositoryObjectMother.create({})
        render(
          <FiltersProvider repository={filtersRepository}>
            <ReadingProvider repository={readingRepository}>
              <CatalogueComponent repository={repository} toToggleBook={() => {}} />
            </ReadingProvider>
          </FiltersProvider>
        )

        const slider: HTMLInputElement = screen.getByRole('slider', { name: /Max Paginas:/ })
        fireEvent.change(slider, { target: { value: 170 } })
        await waitFor(async () => {
          const available = await screen.findByText(/disponibles:/i)
          expect(available).toHaveTextContent(` ${bookFiltered.length}/${books.length}`)

          expect(spy).toHaveBeenCalledTimes(2)
          expect(spy).toHaveBeenCalledWith(FiltersStateObjectMother.create({}))
          expect(spy).toHaveBeenLastCalledWith(FiltersStateObjectMother.create({ nPages: 170 }))
        })
      })

      it('search filters, should render a book list', async () => {
        const books: Book[] = BookMother.createList(10)
        const search = books[0].title.split('')[0].toLowerCase()
        const bookFiltered = books.filter((book) => {
          const author = book.author.name.toLowerCase()
          const gender = book.gender.toLowerCase()
          const synopsis = book.synopsis.toLowerCase()
          const title = book.title.toLowerCase()
          return (
            author.includes(search) || gender.includes(search) || synopsis.includes(search) || title.includes(search)
          )
        })
        const state: Catalogue = {
          books,
          total: books.length,
          avalaible: books.length
        }
        const repository: CatalogueRepository = {
          getCatalogue: vi
            .fn()
            .mockResolvedValueOnce(Promise.resolve(state))
            .mockResolvedValue(
              Promise.resolve({
                books: bookFiltered,
                total: books.length,
                avalaible: bookFiltered.length
              })
            )
        }
        const spy = vi.spyOn(repository, 'getCatalogue')

        const filtersRepository = FiltersRepositoryObjectMother.create({})
        const readingRepository = ReadingRepositoryObjectMother.create({})
        render(
          <FiltersProvider repository={filtersRepository}>
            <ReadingProvider repository={readingRepository}>
              <CatalogueComponent repository={repository} toToggleBook={() => {}} />
            </ReadingProvider>
          </FiltersProvider>
        )

        const searchElement: HTMLInputElement = screen.getByRole('textbox', { name: /Busqueda/i })
        expect(searchElement).toBeInTheDocument()
        fireEvent.change(searchElement, { target: { value: search } })
        await waitFor(async () => {
          const available = await screen.findByText(/disponibles:/i)
          expect(available).toHaveTextContent(` ${bookFiltered.length}/${books.length}`)

          expect(spy).toHaveBeenCalledTimes(2)
          expect(spy).toHaveBeenCalledWith(FiltersStateObjectMother.create({}))
          expect(spy).toHaveBeenLastCalledWith(FiltersStateObjectMother.create({ search }))
        })
      })

      it('all filters, should render a book list', async () => {
        const books = BookMother.createList(10)
        const gender = 'Fantasía'
        const bookGenderFiltered = books.filter((book) => book.gender === gender)
        const pages = 100

        const bookPageFiltered = bookGenderFiltered.filter((book) => book.pages === pages)
        const search = 'a'

        const bookSearchfiltered = bookPageFiltered.filter((book) => {
          const author = book.author.name.toLowerCase()
          const gender = book.gender.toLowerCase()
          const synopsis = book.synopsis.toLowerCase()
          const title = book.title.toLowerCase()
          return (
            author.includes(search) || gender.includes(search) || synopsis.includes(search) || title.includes(search)
          )
        })

        const state: Catalogue = {
          books,
          total: books.length,
          avalaible: books.length
        }
        const repository: CatalogueRepository = {
          getCatalogue: vi
            .fn()
            .mockResolvedValueOnce(Promise.resolve(state))
            .mockResolvedValue(
              Promise.resolve({
                books: bookGenderFiltered,
                total: books.length,
                avalaible: bookGenderFiltered.length
              })
            )
            .mockResolvedValue(
              Promise.resolve({
                books: bookPageFiltered,
                total: books.length,
                avalaible: bookPageFiltered.length
              })
            )
            .mockResolvedValue(
              Promise.resolve({
                books: bookSearchfiltered,
                total: books.length,
                avalaible: bookSearchfiltered.length
              })
            )
        }

        const spy = vi.spyOn(repository, 'getCatalogue')

        const filtersRepository = FiltersRepositoryObjectMother.create({})
        const readingRepository = ReadingRepositoryObjectMother.create({})
        render(
          <FiltersProvider repository={filtersRepository}>
            <ReadingProvider repository={readingRepository}>
              <CatalogueComponent repository={repository} toToggleBook={() => {}} />
            </ReadingProvider>
          </FiltersProvider>
        )

        const genderFantasy = screen.queryByLabelText(gender)
        expect(genderFantasy).toBeInTheDocument()
        fireEvent.click(genderFantasy!)

        const slider: HTMLInputElement = screen.getByRole('slider', { name: /Max Paginas:/ })
        fireEvent.change(slider, { target: { value: pages } })

        const searchElement: HTMLInputElement = screen.getByRole('textbox', { name: /Busqueda/i })
        expect(searchElement).toBeInTheDocument()
        fireEvent.change(searchElement, { target: { value: search } })

        await waitFor(async () => {
          const available = await screen.findByText(/disponibles:/i)
          expect(available).toHaveTextContent(` ${bookSearchfiltered.length}/${books.length}`)

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
