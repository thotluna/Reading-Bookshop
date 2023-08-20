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
  await page.getByRole('button', { name: 'Agregar El Señor de los Anillos' }).click()
  await page.getByRole('button', { name: 'Agregar Harry Potter y la piedra filosofal' }).click()
  await page.getByRole('button', { name: 'Agregar Dune' }).click()
  await page.getByRole('button', { name: 'Mostrar los libros por leer' }).click()

  await page
    .getByRole('img', { name: 'Dune', exact: true })
    .dragTo(page.getByRole('img', { name: 'El Señor de los Anillos', exact: true }))

  await expect(page.locator('div[draggable]').first().getByRole('img', { name: 'Dune', exact: true })).toBeVisible()

  await expect(
    page.locator('div[draggable]').nth(1).getByRole('img', { name: 'El Señor de los Anillos', exact: true })
  ).toBeVisible()

  await expect(
    page.locator('div[draggable]').nth(2).getByRole('img', { name: 'Harry Potter y la piedra filosofal', exact: true })
  ).toBeVisible()
})
