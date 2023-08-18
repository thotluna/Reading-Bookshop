import { test, expect } from '@playwright/test'

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
