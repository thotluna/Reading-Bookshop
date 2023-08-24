import { BookCatalogueComponent } from '@sec-catalogue/BookCatalogueComponent'
import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { BookMother } from '../../modules/catalogue/domain/models'

describe.only('BookCatlogue', () => {
  it.only('should render image', async () => {
    const book = BookMother.createList(1)[0]

    render(
      <BookCatalogueComponent
        book={book}
        onAddReading={() => {}}
        onDragEnd={() => {}}
        onDragOver={() => {}}
        onDragStart={() => {}}
      />
    )

    const image = await screen.findByAltText(`Titulo: ${book.title}`)
    expect(image).toBeInTheDocument()
  })
  it.only('should render read button', async () => {
    const book = BookMother.createList(1)[0]

    render(
      <BookCatalogueComponent
        book={book}
        onAddReading={() => {}}
        onDragEnd={() => {}}
        onDragOver={() => {}}
        onDragStart={() => {}}
      />
    )

    const button = await screen.findByRole('button', { name: /agregar/i })
    expect(button).toBeInTheDocument()
  })
})
