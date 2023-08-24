import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe('Home page', () => {
  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/vite/i)
  })
  test('has name the app', async ({ page }) => {
    await expect(page.getByText('Reading Bookshop')).toBeVisible()
  })
})

test('should be order reading list ', async ({ page }) => {
  await page.getByRole('button', { name: 'Agregar 1984' }).click()
  await page.getByRole('button', { name: 'Agregar Fahrenheit 451' }).click()
  await page.getByRole('button', { name: 'Agregar Drácula' }).click()
  await page.getByRole('button', { name: 'Mostrar los libros por leer' }).click()

  await page
    .getByRole('img', { name: 'Drácula', exact: true })
    .dragTo(page.getByRole('img', { name: '1984', exact: true }))

  await expect(
    page
      .locator('[data-testid="reading-component"] div[draggable]')
      .first()
      .getByRole('img', { name: 'Drácula', exact: true })
  ).toBeVisible()
})

test('should move a book from catalog to reading  ', async ({ page }) => {
  await page.getByRole('button', { name: 'Mostrar los libros por leer' }).click()
  await expect(page.getByRole('img', { name: 'Titulo: Drácula', exact: true })).toBeInViewport()
  await expect(page.getByTestId('reading-component')).toBeInViewport()
  await page.getByRole('img', { name: 'Titulo: Drácula', exact: true }).dragTo(page.getByTestId('reading-component'))

  await expect(
    page
      .locator('[data-testid="reading-component"] div[draggable]')
      .first()
      .getByRole('img', { name: 'Drácula', exact: true })
  ).toBeVisible()
})

test('should remove the book when you drag it from reading to the catalog  ', async ({ page }) => {
  await page.getByRole('button', { name: 'Mostrar los libros por leer' }).click()

  await page.getByRole('button', { name: 'Agregar Drácula', exact: true }).click()

  await page
    .getByRole('img', { name: 'Drácula', exact: true })
    .dragTo(page.getByRole('img', { name: 'Titulo: Drácula', exact: true }))

  await expect(page.locator('[data-testid="reading-component"] div[draggable]')).toHaveCount(0)
})
