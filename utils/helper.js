import { expect } from '@playwright/test'

export async function accessPlatform(page){
    await page.goto('/')
}
