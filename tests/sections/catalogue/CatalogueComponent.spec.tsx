import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, vi } from 'vitest'
import { Book, Catalogue, CatalogueRepository } from '../../../src/modules/catalogue/domain'
import { CatalogueComponent } from '../../../src/sections/catalogue'
import { BookMother } from '../../modules/catalogue/domain/models'

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

    render(<CatalogueComponent repository={repository} toToggleBook={() => {}} />)

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

      render(<CatalogueComponent repository={repository} toToggleBook={() => {}} />)

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

      render(<CatalogueComponent repository={repository} toToggleBook={() => {}} />)

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

      render(<CatalogueComponent repository={repository} toToggleBook={() => {}} />)

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

        render(<CatalogueComponent repository={repository} toToggleBook={() => {}} />)

        const genderFantasy = screen.queryByLabelText('Fantasía')
        expect(genderFantasy).toBeInTheDocument()
        fireEvent.click(genderFantasy!)
        fireEvent.click(genderFantasy!)

        await waitFor(async () => {
          const available = await screen.findByText(/disponibles:/i)
          expect(available).toHaveTextContent(` ${bookFiltered.length}/${books.length}`)

          expect(spy).toHaveBeenCalledTimes(4)
          expect(spy).toHaveBeenCalledWith({
            genders: [],
            nPages: 0,
            search: undefined
          })
          expect(spy).toHaveBeenNthCalledWith(2, {
            genders: ['Fantasía'],
            nPages: 0,
            search: undefined
          })
          expect(spy).toHaveBeenLastCalledWith({
            genders: [],
            nPages: 0,
            search: ''
          })
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

        render(<CatalogueComponent repository={repository} toToggleBook={() => {}} />)

        const slider: HTMLInputElement = screen.getByRole('slider', { name: /Max Paginas:/ })
        fireEvent.change(slider, { target: { value: 170 } })
        await waitFor(async () => {
          const available = await screen.findByText(/disponibles:/i)
          expect(available).toHaveTextContent(` ${bookFiltered.length}/${books.length}`)

          expect(spy).toHaveBeenCalledTimes(2)
          expect(spy).toHaveBeenCalledWith({
            genders: [],
            nPages: 0,
            search: undefined
          })
          expect(spy).toHaveBeenLastCalledWith({
            genders: [],
            nPages: 170,
            search: undefined
          })
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

        render(<CatalogueComponent repository={repository} toToggleBook={() => {}} />)

        const searchElement: HTMLInputElement = screen.getByRole('textbox', { name: /Busqueda/i })
        expect(searchElement).toBeInTheDocument()
        fireEvent.change(searchElement, { target: { value: search } })
        await waitFor(async () => {
          const available = await screen.findByText(/disponibles:/i)
          expect(available).toHaveTextContent(` ${bookFiltered.length}/${books.length}`)

          expect(spy).toHaveBeenCalledTimes(2)
          expect(spy).toHaveBeenCalledWith({
            genders: [],
            nPages: 0,
            search: undefined
          })
          expect(spy).toHaveBeenLastCalledWith({
            genders: [],
            nPages: 0,
            search: search
          })
        })
      })

      it('all filters, should render a book list', async () => {
        const books = BookMother.createList(10)
        const gender = 'Fantasía'
        const bookGenderFiltered = books.filter((book) => book.gender === gender)
        const pages = bookGenderFiltered[0].pages
        const bookPageFiltered = bookGenderFiltered.filter((book) => book.pages === pages)
        const search = bookPageFiltered[0].title.split(' ')[0]
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

        render(<CatalogueComponent repository={repository} toToggleBook={() => {}} />)

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
          expect(spy).toHaveBeenCalledWith({
            genders: [],
            nPages: 0,
            search: undefined
          })
          expect(spy).toHaveBeenNthCalledWith(2, {
            genders: [gender],
            nPages: 0,
            search: undefined
          })

          expect(spy).toHaveBeenNthCalledWith(3, {
            genders: [gender],
            nPages: pages,
            search: undefined
          })

          expect(spy).toHaveBeenLastCalledWith({
            genders: [gender],
            nPages: pages,
            search: search
          })
        })
      })
    })
  })
})
