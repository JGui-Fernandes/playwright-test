import { expect } from "@playwright/test"

export class UserSettingsPage{

    constructor(page){
        this.page = page

        this.myDetailsText = page.getByRole('heading', { name: 'My Details' })

        this.userOption = page.getByRole('link', { name: 'User' })
        this.authenticationOption = page.getByRole('link', { name: 'Authentication' })
        this.adminOption = page.getByRole('link', { name: 'Admin' })
        this.pipelinesOption = page.getByRole('link', { name: 'Pipelines' })
        this.emailTemplatesOption = page.getByRole('link', { name: 'Email Templates' })
        this.displayOption = page.getByRole('link', { name: 'Display' })
    }

    async waitForLoading(){
        await expect(this.myDetailsText).toBeVisible({ timeout: 10000})
    }

    async verifyElements(){
        await expect(this.userOption).toBeVisible()
        await expect(this.authenticationOption).toBeVisible()
        await expect(this.adminOption).toBeVisible()
        await expect(this.pipelinesOption).toBeVisible()
        await expect(this.emailTemplatesOption).toBeVisible()
        await expect(this.displayOption).toBeVisible()
    }

    async clickAdminOption(){
        await this.adminOption.click()
    }
}