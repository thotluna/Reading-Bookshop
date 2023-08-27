import { fireEvent, render, screen } from '@testing-library/react'
import { describe } from 'vitest'
import { Header } from '../../../src/sections'
import { PanelProvider } from '../../../src/sections/panel/panel-provider'
import { PanelRepositoryObjectMother } from '../../modules/panel/domain/models'

describe('Panel', () => {
  test('should call to getPanel when initial render', () => {
    const repository = PanelRepositoryObjectMother.create({})

    const spy = vi.spyOn(repository, 'get')

    render(
      <PanelProvider repository={repository}>
        <Header />
      </PanelProvider>
    )

    expect(spy).toHaveBeenCalledTimes(1)
  })
  test('should call to toggle when click on button', () => {
    const repository = PanelRepositoryObjectMother.create({})

    const spy = vi.spyOn(repository, 'toggle')

    render(
      <PanelProvider repository={repository}>
        <Header />
      </PanelProvider>
    )

    const button = screen.getByRole('button', { name: /mostrar/i })
    expect(button).toBeInTheDocument()

    fireEvent.click(button)

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
