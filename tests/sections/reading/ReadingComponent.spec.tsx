import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { Book } from '../../../src/modules/catalogue/domain'
import { BookReading, ReadingState } from '../../../src/modules/reading/domain/models'
import { ReadingComponent } from '../../../src/sections/reading/ReadingComponent'
import { BookMother } from '../../modules/catalogue/domain/models'

describe('Reading Component', () => {
  it('should render hidden', () => {
    const books: Book[] = BookMother.createList(1)

    const state: ReadingState = {
      books: books.map((b) => {
        return { ...b, position: Number.MAX_SAFE_INTEGER } as BookReading
      }),
      total: books.length,
      show: false
    }

    render(<ReadingComponent state={state} onRemoveBook={() => {}} />)

    const component = screen.queryByTestId('reading-component')
    expect(component).toBeInTheDocument()
    expect(component).toHaveClass('hidden')
  })
  it('should render visible', () => {
    const books = BookMother.createList(1).map((b) => {
      return { ...b, position: 0 }
    })

    const state: ReadingState = {
      books,
      total: books.length,
      show: true
    }

    render(<ReadingComponent state={state} onRemoveBook={() => {}} />)

    const component = screen.queryByTestId('reading-component')
    expect(component).toBeInTheDocument()
    expect(component).toHaveClass('visible')
  })
  describe('without books', () => {
    it('should render message without book', async () => {
      const state: ReadingState = {
        books: [],
        total: 0,
        show: true
      }

      render(<ReadingComponent state={state} onRemoveBook={() => {}} />)

      const component = await screen.findByText(/Todavia no has seleccionado ningun libro para leer./i)
      expect(component).toBeInTheDocument()
    })
  })
  describe('with books', () => {
    it('should render list of book', async () => {
      const books: Book[] = BookMother.createList(1)

      const state: ReadingState = {
        books: books.map((b) => {
          return { ...b, position: Number.MAX_SAFE_INTEGER } as BookReading
        }),
        total: books.length,
        show: false
      }

      render(<ReadingComponent state={state} onRemoveBook={() => {}} />)

      const component = await screen.findByAltText(books[0].title)
      expect(component).toBeInTheDocument()
    })
    it('should return the book when clicked', async () => {
      const books: Book[] = BookMother.createList(1)

      const state: ReadingState = {
        books: books.map((b) => {
          return { ...b, position: Number.MAX_SAFE_INTEGER } as BookReading
        }),
        total: books.length,
        show: false
      }

      let bookFake: BookReading | undefined = undefined

      const handler = (book: BookReading) => {
        bookFake = book
      }

      render(<ReadingComponent state={state} onRemoveBook={handler} />)

      const component = await screen.findByRole('button', { name: /borrar/i })
      fireEvent.click(component)

      expect(bookFake).toEqual({ ...books[0], position: Number.MAX_SAFE_INTEGER } as BookReading)
    })
  })
})
