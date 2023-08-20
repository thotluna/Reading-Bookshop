import { test } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/')
  await page.getByRole('button', { name: 'Agregar El Señor de los Anillos' }).click()
  await page.getByRole('button', { name: 'Agregar Harry Potter y la piedra filosofal' }).click()
  await page.getByRole('button', { name: 'Agregar Dune' }).click()
  await page.getByRole('button', { name: 'Mostrar los libros por leer' }).click()
  await page.getByRole('img', { name: 'Dune', exact: true }).click()
  await page.getByRole('img', { name: 'El Señor de los Anillos', exact: true }).click()
})
