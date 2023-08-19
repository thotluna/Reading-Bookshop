import { ReadingState } from '../..'
import { ReadingRepository } from '../../domain/reading-repository'

export function SaveStateReading(repository: ReadingRepository, state: ReadingState) {
  repository.save(state)
}
