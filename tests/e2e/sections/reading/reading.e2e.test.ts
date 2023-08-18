import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe('Reading Panel', () => {
  test('should render open and close panel', async ({ page }) => {
    await expect(page.getByTestId('reading-component')).toBeHidden()
    await page.getByRole('button', { name: 'Mostrar los libros por leer' }).click()
    await expect(page.getByTestId('reading-component')).toBeInViewport()
    await page.getByRole('button', { name: 'Ocultar lla lista de libros por leer' }).click()
    await expect(page.getByTestId('reading-component')).toBeHidden()
  })
  test.describe('with opened panel', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'Mostrar los libros por leer' }).click()
      await expect(page.getByTestId('reading-component')).toBeInViewport()
    })
    test(`should add a book to panel`, async ({ page }) => {
      await expect(page.getByTestId('book-reading')).not.toBeInViewport()

      await page.getByRole('button', { name: /agregar el señor de los anillos/i }).click()

      await expect(page.getByTestId('book-reading')).toBeInViewport()
    })
    test(`should remove a book to panel`, async ({ page }) => {
      await expect(page.getByTestId('book-reading')).not.toBeInViewport()
      await page.getByRole('button', { name: /agregar el señor de los anillos/i }).click()
      await expect(page.getByTestId('book-reading')).toBeInViewport()

      await page.getByRole('button', { name: /borrar el señor de los anillos/i }).click()
      await expect(page.getByTestId('book-reading')).not.toBeInViewport()
    })
  })
})
