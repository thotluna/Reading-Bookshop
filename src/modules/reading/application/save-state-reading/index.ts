import { ReadingRepository, ReadingState } from '@mod-reading/domain'

export function SaveStateReading(repository: ReadingRepository, state: ReadingState) {
  repository.save(state)
}
