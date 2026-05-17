import { expect } from "@playwright/test"

export class SideBar {

    constructor(page){
        this.page = page

        this.notificationsButton = page.getByRole('button', { name: 'Notifications' })
        this.dashboardButton = page.getByRole('link', { name: 'Dashboard' }).first()

        this.userOptionsButton = page.getByRole('button', { name: 'More' })

        this.helpCenterButton = page.getByRole('menuitem', { name: 'Help Center' })
        this.userSettingsButton = page.getByRole('menuitem', { name: 'User Settings' })
        this.logoutButton = page.getByRole('menuitem', { name: 'Logout' })
    }

    async waitForLoading() {
        await expect(this.dashboardButton).toBeVisible({ timeout: 10000 })
    }

    async verifyElements() {
        await expect(this.notificationsButton).toBeVisible()
        await expect(this.dashboardButton).toBeVisible()
        await expect(this.userOptionsButton).toBeVisible()
    }

    async openUserOptions(){
        await this.userOptionsButton.click()

        await expect(this.helpCenterButton).toBeVisible()
        await expect(this.userSettingsButton).toBeVisible()
        await expect(this.logoutButton).toBeVisible()
    }

    async clickUserSettings(){
        this.userSettingsButton.click()
    }
}