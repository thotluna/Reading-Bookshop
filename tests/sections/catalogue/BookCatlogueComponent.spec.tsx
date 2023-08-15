import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BookMother } from '../../modules/catalogue/domain/models'
import { BookCatalogueComponent } from '../../../src/sections/catalogue'
import React from 'react'

describe.only('BookCatlogue', () => {
  it.only('should render image', async () => {
    const book = BookMother.createList(1)[0]

    render(<BookCatalogueComponent book={book} onAddReading={() => {}} />)

    const image = await screen.findByAltText(book.title)
    expect(image).toBeInTheDocument()
  })
  it.only('should render read button', async () => {
    const book = BookMother.createList(1)[0]

    render(<BookCatalogueComponent book={book} onAddReading={() => {}} />)

    const button = await screen.findByRole('button', { name: /leer/i })
    expect(button).toBeInTheDocument()
  })
})
