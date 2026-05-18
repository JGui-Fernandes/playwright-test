import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import * as users from '../../data/users.json'
import * as helper from '../../utils/helper'
import { SideBar } from '../../components/SideBar'
import { UserSettingsPage } from '../../pages/UserSettingsPage'
import { AdminPage } from '../../pages/AdminPage'

test.beforeEach(async( {page} )=>{
    const loginPage = new LoginPage(page)

    await helper.accessPlatform(page)

    await loginPage.verifyUrl()
    
    await loginPage.verifyElements()
    await loginPage.login(users.user.email, users.user.password)

    const sideBar = new SideBar(page)

    await sideBar.waitForLoading()

    const adminPage = new AdminPage(page)

    await sideBar.verifyElements()
    await sideBar.openUserOptions()
    await sideBar.clickUserSettings()

    const userSettingsPage = new UserSettingsPage(page)

    await userSettingsPage.waitForLoading()
    await userSettingsPage.verifyElements()
    await userSettingsPage.clickAdminOption()

    await adminPage.waitForLoading()

    await adminPage.waitForBudgetingLoading()
    
    await adminPage.removeAllCategories()
    await adminPage.cleanTotalBudgetInput()
})


test('should show empty categories message', async( {page} ) =>{
    const values = {
        total: 1000,
        allocated: '0',
        remaining: '1,000'
    }

    const adminPage = new AdminPage(page)

    await adminPage.verifyBudgetingElements()

    await adminPage.fillTotalBudgetInput(values.total)
    await adminPage.verifySuccessMessage()

    await adminPage.verifyAllocatedValue(values.allocated)
    await adminPage.verifyRemainingValue(values.remaining)

    await adminPage.verifyNoCategoryMessageIsVisible()
})

test('should create category without allocated value', async( {page} ) =>{
    const values = {
        total: 1000,
        allocated: '0',
        remaining: '1,000'
    }

    const adminPage = new AdminPage(page)

    await adminPage.verifyBudgetingElements()

    await adminPage.fillTotalBudgetInput(values.total)
    await adminPage.verifySuccessMessage()

    await adminPage.verifyAllocatedValue(values.allocated)
    await adminPage.verifyRemainingValue(values.remaining)

    await adminPage.clickAddCategory()
    await adminPage.verifyCategoryElementsFromAllCategories()

    await adminPage.verifyNoCategoryMessageIsNotVisible()
})

test('should allow adding multiple categories', async( {page} ) =>{

    const count = 3;
    const values = {
        total: 1000,
        allocated: '0',
        remaining: '1,000',
    }


    const adminPage = new AdminPage(page)

    await adminPage.verifyBudgetingElements()

    await adminPage.fillTotalBudgetInput(values.total)
    await adminPage.verifySuccessMessage()

    await adminPage.verifyAllocatedValue(values.allocated)
    await adminPage.verifyRemainingValue(values.remaining)

    await adminPage.clickAddCategory(count)
    
    await adminPage.verifyCategoryElementsFromAllCategories()

})

test('should display warning for negative budget value', async ( {page}) => {
    const values = {
        total: -10
    }


    const adminPage = new AdminPage(page)

    await adminPage.verifyBudgetingElements()

    await adminPage.fillTotalBudgetInput(values.total)
    await adminPage.verifyWarningMessageIsVisible()

})


test('should hide warning message after entering a valid budget', async ( {page}) => {
    const values = {
        invalid: -10,
        valid: 1000
    }

    const adminPage = new AdminPage(page)

    await adminPage.verifyBudgetingElements()

    await adminPage.fillTotalBudgetInput(values.invalid)
    await adminPage.verifyWarningMessageIsVisible()

    await adminPage.cleanTotalBudgetInput()

    await adminPage.fillTotalBudgetInput(values.valid)
    await adminPage.verifyWarningMessageIsNotVisible()

})


