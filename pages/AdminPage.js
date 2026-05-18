import { expect } from "@playwright/test"

export class AdminPage{

    constructor(page){
        this.page = page

        this.addTeamMemberButton = page.getByRole('button', { name: 'Team Member' })

        this.budgetingTitleText = page.getByRole('heading', { name: 'Budgeting' })
        this.startOfBudgetMonthText = page.getByText('Start Of Budget Year')
        this.openMonthOptionButton = page.locator('.css-1xghfbp > .css-hfbj6y')
        this.budgetYearText = page.getByText('Budget Year', { exact: true })
        this.budgetYearButton = page.locator('[data-sentry-component="BudgetManager"] > div > div > button').first()
        this.totalBudgetText = page.getByText('Total budget year grant')
        this.totalBudgetInput = page.getByRole('textbox', { name: 'Total budget year grant' })
        this.totalAllocatedText = page.getByText('Total Allocated: $')
        this.remainingText = page.getByText('Remaining: $')
        this.allocationCategoriesText = page.getByRole('heading', { name: 'Allocation categories' })
        this.addCategoryButton = page.getByRole('button', { name: 'Add' }).nth(3)

        this.categoriesItens = page.locator('.css-66r8ng')
        
        this.successMessage = page.locator('[role="status"]').first()
        this.warningMessage = page.getByText('Warning: ')
        this.noCategoryMessage = page.getByText('No budget allocations for ')
    }

    categoryName(index){
        return this.categoriesItens.nth(index).locator('input').nth(0)
    }

    categoryValue(index){
        return this.categoriesItens.nth(index).locator('input').nth(1)
    }

    categoryRemove(index){
        return this.categoriesItens.nth(index).locator('button').nth(0)
    }

    categoryAddSub(index){
        return this.categoriesItens.nth(index).locator('button').nth(1)
    }

    async waitForLoading(){
        await expect(this.addTeamMemberButton).toBeVisible({ timeout: 10000})
    }
    
    async waitForBudgetingLoading(){
        await expect(this.startOfBudgetMonthText).toBeVisible({ timeout: 10000})
    }

    async verifyBudgetingElements(){
        await expect(this.budgetingTitleText).toBeVisible()
        await expect(this.startOfBudgetMonthText).toBeVisible()
        await expect(this.openMonthOptionButton).toBeVisible()
        await expect(this.budgetYearText).toBeVisible()
        await expect(this.budgetYearButton).toBeVisible()
        await expect(this.totalBudgetText).toBeVisible()
        await expect(this.totalBudgetInput).toBeVisible()
        await expect(this.totalAllocatedText).toBeVisible()
        await expect(this.remainingText).toBeVisible()
        await expect(this.allocationCategoriesText).toBeVisible()
        await expect(this.addCategoryButton).toBeVisible()
    }

    async clickAddCategory(quantity = 1){
        for(var i = 0; i < quantity; i++){
            await this.addCategoryButton.click()
        }
    }

    async verifyCategoryElementsFromAllCategories(){
        const count = await this.categoriesItens.count() 

        for(var i = 0; i < count; i++){
            await expect(this.categoryName(i)).toBeVisible()
            await expect(this.categoryValue(i)).toBeVisible()
            await expect(this.categoryRemove(i)).toBeVisible()
            await expect(this.categoryAddSub(i)).toBeVisible()
        }
    }

    async verifySuccessMessage(){
        await expect(this.successMessage).toBeVisible()
    }

    async fillTotalBudgetInput(total = 10000){
        await this.totalBudgetInput.fill(total.toString())
        await this.budgetingTitleText.click()
    }

    async verifyAllocatedValue(expectedValue){
        await expect(this.totalAllocatedText).toContainText(expectedValue)
    }

    async verifyRemainingValue(expectedValue){
        await expect(this.remainingText).toContainText(expectedValue)
    }

    async verifyNoCategoryMessageIsVisible(){
        await expect(this.noCategoryMessage).toBeVisible({ timeout: 3000 })
    }


    async verifyNoCategoryMessageIsNotVisible(){
        await expect(this.noCategoryMessage).not.toBeVisible({ timeout: 3000 })
    }

    async removeAllCategories(){
        const count = await this.categoriesItens.count() 

        for(var i = 0; i < count; i++){
            await this.categoryRemove(i).click()
        }
    }

    async cleanTotalBudgetInput(){
        await this.totalBudgetInput.clear()

        await this.totalBudgetInput.fill('')
    }

    async fillCategoryName(index, name){
        await this.categoryName(index).fill(name)
    }

    async fillCategoryValue(index, value){
        await this.categoryValue(index).fill(value)
    }

    async createCompleteCategory(name, value){

        const oldCount = await this.categoriesItens.count()

        await this.clickAddCategory()

        await expect(this.categoriesItens)
            .toHaveCount(oldCount + 1)

        const newIndex = oldCount

        if(name !== null){

            await this.fillCategoryName(
                newIndex,
                name.toString()
            )
        }

        if(value !== null){

            await this.fillCategoryValue(
                newIndex,
                value.toString()
            )
        }

        await this.budgetingTitleText.click()
    }

    async verifyWarningMessageIsVisible(){
        await expect(this.warningMessage).toBeVisible()
    }

    async verifyWarningMessageIsNotVisible(){
        await expect(this.warningMessage).not.toBeVisible()
    }
}