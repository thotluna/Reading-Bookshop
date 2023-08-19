import { ReadingRepository } from '../../domain/reading-repository'

export function GetReading(repository: ReadingRepository) {
  return repository.get()
}
