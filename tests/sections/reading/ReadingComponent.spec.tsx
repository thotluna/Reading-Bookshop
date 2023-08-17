import { describe, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { ReadingComponent } from '../../../src/sections/reading/ReadingComponent'
import { ReadingState } from '../../../src/modules/reading/domain/models'
import { Book, BookCatalogue } from '../../../src/modules/catalogue/domain'
import { BookMother } from '../../modules/catalogue/domain/models'
import React from 'react'
describe('Reading Component', () => {
  it('should render hidden', () => {
    const books: Book[] = BookMother.createList(1)

    const state: ReadingState = {
      books: books.map((b) => b as BookCatalogue),
      total: books.length,
      show: false
    }

    render(<ReadingComponent state={state} toToggleBook={() => {}} />)

    const component = screen.queryByTestId('reading-component')
    expect(component).toBeInTheDocument()
    expect(component).toHaveClass('hidden')
  })
  it('should render visible', () => {
    const books = BookMother.createList(1)

    const state: ReadingState = {
      books,
      total: books.length,
      show: true
    }

    render(<ReadingComponent state={state} toToggleBook={() => {}} />)

    const component = screen.queryByTestId('reading-component')
    expect(component).toBeInTheDocument()
    expect(component).toHaveClass('visible')
  })
  describe('without books', () => {
    it.skip('should render message without book', () => {})
  })
  describe('with books', () => {
    it('should render list of book', async () => {
      const books: Book[] = BookMother.createList(1)

      const state: ReadingState = {
        books: books.map((b) => b as BookCatalogue),
        total: books.length,
        show: false
      }

      render(<ReadingComponent state={state} toToggleBook={() => {}} />)

      const component = await screen.findByAltText(books[0].title)
      expect(component).toBeInTheDocument()
    })
    it('should return the book when clicked', async () => {
      const books: Book[] = BookMother.createList(1)

      const state: ReadingState = {
        books: books.map((b) => b as BookCatalogue),
        total: books.length,
        show: false
      }

      let bookFake: BookCatalogue | undefined = undefined

      const handler = (book: BookCatalogue) => {
        bookFake = book
      }

      render(<ReadingComponent state={state} toToggleBook={handler} />)

      const component = await screen.findByRole('button', { name: /leer/i })
      fireEvent.click(component)

      expect(bookFake).toEqual(books[0] as BookCatalogue)
    })
  })
})
