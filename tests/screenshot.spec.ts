import { test } from '@playwright/test'

test('capture home page screenshot', async ({ page }) => {
    await page.goto('/')
    // wait for the calculator card to appear
    await page.waitForSelector('.card', { timeout: 5000 })
    // small settle time for animations/hydration
    await page.waitForTimeout(250)
    await page.screenshot({ path: 'tmp/home-screenshot.png', fullPage: true })
})
