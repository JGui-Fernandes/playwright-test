import { expect } from "@playwright/test"

export class SideBar {

    constructor(page){
        this.page = page

        this.searchInput = page.locator('[class="css-i9gxme"]')
        this.notificationsButton = page.locator('[class="css-1eziwv"]')
        this.dashboardButton = page.locator('[class="css-8uvc3n"]')

        this.userOptionsButton = page.locator('[id="menu-button-:r7q:"]')

        this.helpCenterButton = page.getByText('Help Center')
        this.userPreferencesButton = page.getByText('User Settings')
        this.logoutButton = page.getByText('Logout')
    }

    async verifyElements() {
        await expect(this.searchInput).toBeVisible()
        await expect(this.notificationsButton).toBeVisible()
        await expect(this.dashboardButton).toBeVisible()

        await expect(this.userOptionsButton).toBeVisible()
    }

    async openUserOptions(){
        await this.userOptionsButton.click()

        await expect(this.helpCenterButton).toBeVisible()
        await expect(this.userPreferencesButton).toBeVisible()
        await expect(this.logoutButton).toBeVisible()
    }
}