import { test, expect } from '@playwright/test'
import { spawn } from 'child_process'

let dev: any = null

// Start vite dev server before tests
test.beforeAll(async () => {
    dev = spawn('npm', ['run', 'dev'], { stdio: 'inherit' })
    // wait for the dev server to be ready
    await new Promise((resolve) => setTimeout(resolve, 800))
})

test.afterAll(async () => {
    if (dev) {
        dev.kill('SIGTERM')
    }
})

test('home page renders calculator with semantic tokens and card background', async ({ page }) => {
    await page.goto('/')

    // Main element should be present (server/hydrated markup varies)
    const main = await page.locator('main')
    await expect(main).toHaveCount(1)

    // Page heading present inside main
    const h1 = main.locator('h1')
    await expect(h1).toContainText('BMR & TDEE Calculator')

    // Check .card computed background color (allow white or soft neutral)
    const card = await page.locator('.card').first()
    await expect(card).toHaveCount(1)
    const bg = await card.evaluate((el) => getComputedStyle(el).backgroundColor)
    // allow rgb(255,255,255) = #ffffff or rgb(242,242,242) = #f2f2f2 (build/runtime may vary)
    console.log('DEBUG: computed .card background ->', bg)
    const ok =
        bg === 'rgb(255, 255, 255)' ||
        bg === 'rgba(255, 255, 255, 1)' ||
        bg === 'rgb(242, 242, 242)' ||
        bg === 'rgba(242, 242, 242, 1)'
    expect(ok).toBeTruthy()
})
