import { BookBasic } from '.'
import { Author } from './author'

export interface Book extends BookBasic {
  synopsis: string
  year: number
  ISBN: string
  author: Author
}
