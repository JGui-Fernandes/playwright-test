import { expect } from "@playwright/test"

export class LoginPage {
  constructor(page) {
    this.page = page

    this.emailInput = page.locator('[id="username"]')
    this.passwordInput = page.locator('[id="password"]')
    this.loginButton = page.locator('[id="signin-button"]')
    this.logoImage = page.locator('[alt="Temelio"]')
    this.welcomeText = page.locator('h1[data-sentry-element="Heading"]')
    
    this.endpoint = '/signin'
  }

  async goto() {
    await this.page.goto(this.endpoint)
  }

  async verifyUrl(){
    await expect(this.page.url()).toContain(this.endpoint)
  }

  async verifyElements(){
    await expect(this.logoImage).toBeVisible()
    await expect(this.emailInput).toBeVisible()
    await expect(this.passwordInput).toBeVisible()
    await expect(this.welcomeText).toBeVisible()
  }

  async login(email, password) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.loginButton.click()

    // await expect(this.page.locator('[data-ph-capture-attribute-analytics-id="dashboard-add-widget"]'))
    
  }
}