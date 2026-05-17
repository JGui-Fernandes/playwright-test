import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import * as users from '../../data/users.json'
import * as helper from '../../utils/helper'
import { SideBar } from '../../components/SideBar'

test('test', async( {page} ) =>{
    const loginPage = new LoginPage(page)

    await helper.accessPlatform(page)

    await loginPage.verifyUrl()
    
    await loginPage.verifyElements()
    await loginPage.login(users.user.email, users.user.password)

    await page.waitForSelector('[data-ph-capture-attribute-analytics-id="dashboard-add-widget"]')

    const sideBar = new SideBar(page)
    sideBar.verifyElements()
})