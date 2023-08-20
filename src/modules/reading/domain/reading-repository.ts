import { ReadingState } from '.'

export interface ReadingRepository {
  get: () => Promise<ReadingState>
  save: (state: ReadingState) => Promise<void>
  delAll: () => Promise<void>
}
