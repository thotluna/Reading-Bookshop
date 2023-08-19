import { ReadingState } from '../..'
import { ReadingRepository } from '../../domain/reading-repository'

export function ChangePanelReading(repository: ReadingRepository, show: boolean) {
  repository.get().then((state) => {
    const newState: ReadingState = {
      ...state,
      show
    }
    repository.save(newState)
  })
}
