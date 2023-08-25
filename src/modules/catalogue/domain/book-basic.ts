import { Gender } from './gender'

export interface BookBasic {
  ISBN: string
  title: string
  cover: string
  gender: Gender
}
