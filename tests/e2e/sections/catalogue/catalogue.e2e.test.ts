import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe('Home page', () => {
  test('has title for catalogue', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Catalogo' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Libros Disponibles: 13/13' })).toBeVisible()
  })
  test('has label for gender filters', async ({ page }) => {
    await expect(page.getByLabel('Fantasía')).toBeVisible()
    await expect(page.getByLabel('Ciencia ficción')).toBeVisible()
    await expect(page.getByLabel('Zombies')).toBeVisible()
    await expect(page.getByLabel('Terror')).toBeVisible()
  })
  test('has label for max page filters', async ({ page }) => {
    await expect(page.getByLabel('Max Paginas')).toBeVisible()
  })
  test('has label for search filters', async ({ page }) => {
    await expect(page.getByLabel('Busqueda')).toBeVisible()
  })
  test.describe('without book', () => {
    test('should render image search', async ({ page }) => {
      await expect(page.getByRole('img', { name: /loading/i })).toHaveCount(13)
    })
  })
  test.describe('with book', () => {
    test('should render image of books', async ({ page }) => {
      await expect(page.getByAltText(/Titulo/)).toHaveCount(13)
    })
    test('should render add button', async ({ page }) => {
      const book = page
        .getByTestId('book-catalogue')
        .filter({ has: page.getByRole('button', { name: /agregar el señor de los anillos/i }) })
      await expect(book).toBeVisible()
    })
    test('should render cover image', async ({ page }) => {
      const book = page
        .getByTestId('book-catalogue')
        .filter({ has: page.getByRole('img', { name: /titulo: el señor de los anillos/i }) })
      await expect(book).toBeVisible()
    })
    test.describe('with filtered', () => {
      test('should filter by genre', async ({ page }) => {
        const available = page.getByRole('heading', { name: /Libros Disponibles:/ })
        await expect(available).toBeVisible()
        await expect(available).toContainText('13/13')

        await page.getByLabel('Fantasía').check()

        await expect(available).toContainText('3/13')
        await expect(page.getByTestId('book-catalogue')).toHaveCount(3)

        await page.getByLabel('Fantasía').uncheck()
        await expect(available).toContainText('13/13')
        await expect(page.getByTestId('book-catalogue')).toHaveCount(13)
      })
      test('should filter by pages', async ({ page }) => {
        const available = page.getByRole('heading', { name: /Libros Disponibles:/ })
        await expect(available).toBeVisible()
        await expect(available).toContainText('13/13')

        const maxPage = 810

        const slider = page.getByLabel(/Max Paginas:/)

        const regex = /(\d+)/g
        //eslint-disable-next-line no-constant-condition
        while (true) {
          const text = await page.getByTestId('filter-pages').locator('span').innerText()

          if (Number(text.match(regex)?.[0]) >= maxPage) {
            break
          }
          await slider.press('ArrowRight')
        }

        await expect(available).toContainText('1/13')
        await expect(page.getByTestId('book-catalogue')).toHaveCount(1)
      })
      test('should filter by search', async ({ page }) => {
        const available = page.getByRole('heading', { name: /Libros Disponibles:/ })
        await expect(available).toBeVisible()
        await expect(available).toContainText('13/13')

        await page.getByLabel('Busqueda').type('señor')

        await expect(available).toContainText('1/13')
        await expect(page.getByTestId('book-catalogue')).toHaveCount(1)

        await page.getByLabel('Busqueda').clear()

        await expect(available).toBeVisible()
        await expect(page.getByTestId('book-catalogue')).toHaveCount(13)
      })
    })
  })
})
