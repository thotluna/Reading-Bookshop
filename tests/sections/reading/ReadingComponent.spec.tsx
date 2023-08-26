import { ReadingProvider } from '@sec-reading/context'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, it } from 'vitest'
import { PanelProvider } from '../../../src/sections/panel/panel-provider'
import { ReadingComponent } from '../../../src/sections/reading/ReadingComponent'
import { PanelRepositoryObjectMother, PanelStateObjectMother } from '../../modules/panel/domain/models'
import { ReadingRepositoryObjectMother, ReadingStateObjectMother } from '../../modules/reading/domain/models'

describe('Reading Component', () => {
  it('should render hidden', () => {
    const panelRepository = PanelRepositoryObjectMother.create({})
    const state = ReadingStateObjectMother.create({})
    const readingRepository = ReadingRepositoryObjectMother.create({
      readingState: state
    })

    render(
      <ReadingProvider repository={readingRepository}>
        <PanelProvider repository={panelRepository}>
          <ReadingComponent />
        </PanelProvider>
      </ReadingProvider>
    )

    waitFor(async () => {
      const component = screen.queryByTestId('reading-component')
      expect(component).toBeInTheDocument()
      expect(component).toHaveClass('hidden')
    })
  })
  it('should render visible', () => {
    const panelRepository = PanelRepositoryObjectMother.create({
      panelState: PanelStateObjectMother.create({ panel: 'show' })
    })
    const state = ReadingStateObjectMother.create({})
    const readingRepository = ReadingRepositoryObjectMother.create({
      readingState: state
    })

    render(
      <ReadingProvider repository={readingRepository}>
        <PanelProvider repository={panelRepository}>
          <ReadingComponent />
        </PanelProvider>
      </ReadingProvider>
    )

    waitFor(async () => {
      const component = screen.queryByTestId('reading-component')
      expect(component).toBeInTheDocument()
      expect(component).toHaveClass('visible')
    })
  })
  describe('without books', () => {
    it('should render message without book', async () => {
      const panelRepository = PanelRepositoryObjectMother.create({
        panelState: PanelStateObjectMother.create({ panel: 'show' })
      })

      const state = ReadingStateObjectMother.create({ count: 0 })
      const readingRepository = ReadingRepositoryObjectMother.create({
        readingState: state
      })

      render(
        <ReadingProvider repository={readingRepository}>
          <PanelProvider repository={panelRepository}>
            <ReadingComponent />
          </PanelProvider>
        </ReadingProvider>
      )

      const component = await screen.findByText(/Todavía no has seleccionado ningún libro para leer./i)
      expect(component).toBeInTheDocument()
    })
  })
  describe('with books', () => {
    it('should render list of book', async () => {
      const panelRepository = PanelRepositoryObjectMother.create({
        panelState: PanelStateObjectMother.create({ panel: 'show' })
      })

      const state = ReadingStateObjectMother.create({})
      const readingRepository = ReadingRepositoryObjectMother.create({
        readingState: state
      })

      render(
        <ReadingProvider repository={readingRepository}>
          <PanelProvider repository={panelRepository}>
            <ReadingComponent />
          </PanelProvider>
        </ReadingProvider>
      )

      const component = await screen.findByAltText(state.books[0].title)
      expect(component).toBeInTheDocument()
    })

    it('should return the book when clicked', async () => {
      const panelRepository = PanelRepositoryObjectMother.create({
        panelState: PanelStateObjectMother.create({ panel: 'show' })
      })

      const state = ReadingStateObjectMother.create({})
      const readingRepository = ReadingRepositoryObjectMother.create({
        readingState: state
      })

      const spy = vi.spyOn(readingRepository, 'save')

      render(
        <ReadingProvider repository={readingRepository}>
          <PanelProvider repository={panelRepository}>
            <ReadingComponent />
          </PanelProvider>
        </ReadingProvider>
      )

      const component = await screen.findByRole('button', { name: /borrar/i })
      fireEvent.click(component)

      waitFor(() => {
        expect(screen.getByText('Todavia no has seleccionado ningun libro para leer.')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /borrar/i })).toBeInTheDocument()

        expect(spy).toBeCalledTimes(1)
        expect(spy).toBeCalledWith(ReadingStateObjectMother.create({ count: 0 }))
      })
    })
  })
})
