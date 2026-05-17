import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import * as users from '../../data/users.json'
import * as helper from '../../utils/helper'
import { SideBar } from '../../components/SideBar'
import { UserSettingsPage } from '../../pages/UserSettingsPage'
import { AdminPage } from '../../pages/AdminPage'

test('test', async( {page} ) =>{
    const loginPage = new LoginPage(page)

    await helper.accessPlatform(page)

    await loginPage.verifyUrl()
    
    await loginPage.verifyElements()
    await loginPage.login(users.user.email, users.user.password)

    
    const sideBar = new SideBar(page)

    await sideBar.waitForLoading()

    await sideBar.verifyElements()
    await sideBar.openUserOptions()
    await sideBar.clickUserSettings()


    const userSettingsPage = new UserSettingsPage(page)

    await userSettingsPage.waitForLoading()
    await userSettingsPage.verifyElements()
    await userSettingsPage.clickAdminOption()

    const adminPage = new AdminPage(page)

    await adminPage.waitForLoading()
})