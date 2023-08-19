import { ReadingState } from '..'
import { ReadingRepository } from '../domain/reading-repository'

export function LocalStorageReadingRepository(): ReadingRepository {
  return {
    get: () => get(),
    save: (state: ReadingState) => {
      return save(state)
    }
  }
}

export const ITEM_READING = 'item-reading'

const get = () => {
  const readingStateRaw = localStorage.getItem(ITEM_READING)

  if (!readingStateRaw)
    return Promise.resolve({
      books: [],
      total: 0,
      show: false
    })

  const res = Promise.resolve(JSON.parse(readingStateRaw))
  return res
}

const save = async (state: ReadingState) => {
  const stateOld = await get()
  if (state === stateOld) return
  const stateRaw = JSON.stringify(state)
  localStorage.setItem(ITEM_READING, stateRaw)
  return Promise.resolve()
}
