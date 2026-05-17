import { expect } from "@playwright/test"

export class LoginPage {
  constructor(page) {
    this.page = page

    this.emailInput = page.locator('#username')
    this.passwordInput = page.locator('#password')
    this.loginButton = page.getByRole('button', { name: 'Sign In' })
    this.logoImage = page.getByRole('link', { name: 'Temelio' })
    this.welcomeText = page.getByRole('heading', { name: 'Welcome back' })
    
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
    
  }
}