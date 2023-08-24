import { faker } from '@faker-js/faker'
import { render, screen, waitFor } from '@testing-library/react'
import { describe } from 'vitest'
import { Image } from '../../../src/sections/components'

describe('Image component', () => {
  it('should render a Loading', async () => {
    const url = faker.image.urlLoremFlickr()

    render(<Image src={url} alt="test" />)

    const loading = screen.queryByRole('img', { name: /loading/i })
    expect(loading).toBeInTheDocument()
    const image = screen.queryByAltText('test')
    expect(image).toHaveClass('hidden')
  })
  it('should render a image', async () => {
    const url = faker.image.urlLoremFlickr({ width: 50 })

    render(<Image src={url} alt="test" />)

    const loading = screen.queryByRole('img', { name: /loading/i })
    expect(loading).toBeInTheDocument()

    waitFor(async () => {
      const image = await screen.findByAltText('tests')
      expect(image).toBeInTheDocument()
      expect(image).toHaveClass('visible')
    })
  })
  it('should render a error', async () => {
    const url = 'error'

    render(<Image src={url} alt="test" />)

    const loading = screen.queryByRole('img', { name: /loading/i })
    expect(loading).toBeInTheDocument()

    waitFor(async () => {
      const image = await screen.findByAltText('Error al descargar la Imagen')

      expect(image).toBeInTheDocument()
    })
  })
})
