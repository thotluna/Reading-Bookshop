import { ReadingRepository } from '@mod-reading/domain'

export function GetReading(repository: ReadingRepository) {
  return repository.get()
}
