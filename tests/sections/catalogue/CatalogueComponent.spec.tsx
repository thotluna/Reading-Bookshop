import { describe, vi } from 'vitest'
import { Catalogue, CatalogueRepository } from '../../../src/modules/catalogue/domain'
import { render, screen } from '@testing-library/react'
import { CatalogueComponent } from '../../../src/sections/catalogue'
import React from 'react'
import { BookMother } from '../../modules/catalogue/domain/models'

describe('CatalogueComponent', () => {
  it('should render title', () => {
    const state: Catalogue = {
      books: [],
      total: 0,
      avalaible: 0
    }
    const repository: CatalogueRepository = {
      getCatalogue: vi.fn().mockResolvedValue(Promise.resolve(state))
    }

    render(<CatalogueComponent repository={repository} />)

    const title = screen.queryByText(/catalogo/i)
    expect(title).toBeInTheDocument()

    expect(screen.queryByText(/total/i)).toHaveTextContent(' 0')
    expect(screen.queryByText(/disponibles:/i)).toHaveTextContent(' 0')
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

      render(<CatalogueComponent repository={repository} />)

      const total = await screen.findByText(/total/i)
      expect(total).toHaveTextContent(' 0')
      const available = await screen.findByText(/disponibles:/i)
      expect(available).toHaveTextContent(' 0')
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

      render(<CatalogueComponent repository={repository} />)

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

      render(<CatalogueComponent repository={repository} />)

      await screen.findAllByRole('button', { name: /leer/i })

      const total = await screen.findByText(/total/i)
      const available = await screen.findByText(/disponibles:/i)

      expect(total).toHaveTextContent(` ${book.length}`)
      expect(available).toHaveTextContent(` ${book.length}`)
    })
  })
})
