import { faker } from '@faker-js/faker'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { describe } from 'vitest'
import { Image } from '../../../src/sections/components'
import React from 'react'

describe('Image component', () => {
  it('should render a Loading', async () => {
    const url = faker.image.urlLoremFlickr()

    render(<Image src={url} alt="test" />)

    const loading = screen.queryByRole('img', { name: /loading/i })
    expect(loading).toBeInTheDocument()
    const image = screen.queryByAltText('test')
    expect(image).toHaveClass('hidden')
  })
  it.skip('should render a image', async () => {
    const url = faker.image.urlLoremFlickr()

    render(<Image src={url} alt="test" />)

    const loading = screen.queryByRole('img', { name: /loading/i })
    expect(loading).toBeInTheDocument()

    await waitForElementToBeRemoved(() => screen.queryByRole('img', { name: /loading/i }), { timeout: 4000 })

    // const image = await screen.findByAltText('tests')
    // expect(image).toHaveClass('visible')
  })
  it.skip('should render a error', async () => {
    const url = 'error'

    render(<Image src={url} alt="test" />)
  })
})
