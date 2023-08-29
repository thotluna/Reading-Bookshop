import { BookCatalogueComponent } from '@sec-catalogue/components'
import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { BookMother } from '../../modules/catalogue/domain/models'

describe('BookCatalogue', () => {
  it('should render image', async () => {
    const book = BookMother.createList(1)[0]

    render(<BookCatalogueComponent book={book} onAddReading={() => {}} />)

    const image = await screen.findByAltText(`Título: ${book.title}`)
    expect(image).toBeInTheDocument()
  })
  it('should render read button', async () => {
    const book = BookMother.createList(1)[0]

    render(<BookCatalogueComponent book={book} onAddReading={() => {}} />)

    const button = await screen.findByRole('button', { name: /agregar/i })
    expect(button).toBeInTheDocument()
  })
})
