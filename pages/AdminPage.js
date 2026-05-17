import { expect } from "@playwright/test"

export class AdminPage{

    constructor(page){
        this.page = page

        this.addTeamMemberButton = page.getByRole('button', { name: 'Team Member' })
        this.budgetingTitleText = page.getByRole('heading', { name: 'Budgeting' })
    }

    async waitForLoading(){
        await expect(this.addTeamMemberButton).toBeVisible({ timeout: 10000})
    }

    async verifyElements(){
        await expect(this.budgetingTitleText).toBeVisible()
    }
}