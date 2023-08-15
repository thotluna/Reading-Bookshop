import { Factory } from 'fishery'
import { faker } from '@faker-js/faker'
import { Author, Book } from '@/modules/catalogue/domain'

const AuthorFactory = Factory.define<Author>(() => ({
  name: faker.person.fullName(),
  otherBooks: []
}))

export const AuthorMother = {
  create: (): Author => {
    return AuthorFactory.build()
  }
}

const BookFactory = Factory.define<Book>(() => ({
  title: faker.lorem.words(5),
  pages: faker.number.int({ min: 10, max: 2000 }),
  gender: faker.helpers.arrayElement(['Fantasía', 'Ciencia ficción', 'Zombies', 'Terror']),
  cover: faker.image.urlLoremFlickr(),
  synopsis: faker.lorem.paragraphs(3),
  year: faker.number.int({ min: 1900, max: 2024 }),
  ISBN: faker.string.uuid(),
  author: AuthorMother.create()
}))

export const BookMother = {
  createList: (length = 5): Book[] => {
    return BookFactory.buildList(length)
  }
}
