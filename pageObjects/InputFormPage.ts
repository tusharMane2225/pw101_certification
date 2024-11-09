import { expect, type Locator, type Page } from '@playwright/test';

export class InputFormPage{
    readonly page: Page;
    readonly nameInput :Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly companyInput: Locator;
    readonly websiteInput: Locator;
    readonly countrySelect : Locator;
    readonly cityInput : Locator;
    readonly address1_Input : Locator;
    readonly address2_Input : Locator;
    readonly stateInput : Locator;
    readonly zipCodeInput: Locator;
    readonly submitButton : Locator;
    readonly successMessage : Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.locator('#name')
        this.emailInput = page.locator('#inputEmail4');
        this.passwordInput= page.getByPlaceholder('Password')
        this.companyInput=page.getByPlaceholder('Company')
        this.websiteInput=page.locator('#websitename')
        this.countrySelect=page.locator('[name=country]')
        this.cityInput=page.getByPlaceholder('City')
        this.address1_Input=page.locator('[name=address_line1]')
        this.address2_Input=page.locator('[name=address_line2]')
        this.stateInput=page.getByPlaceholder('State')
        this.zipCodeInput=page.locator('#inputZip')
        this.submitButton = page.locator('button',{hasText:'Submit'})
        this.successMessage =page.locator('.success-msg');
      }

      async fillForm(){
        await this.nameInput.fill('Test');
        await this.emailInput.fill('test@mailinator.com');
        await this.passwordInput.fill('Test123')
        await this.companyInput.fill('Test');
        await this.websiteInput.fill('test');
        await this.countrySelect.selectOption('United States')
        await this.cityInput.fill('Test')
        await this.address1_Input.fill('Test')
        await this.address2_Input.fill('Test')
        await this.stateInput.fill('Test');
        await this.zipCodeInput.fill('123573');

        await this.clickOnSubmitButton();
      }

      async getSuccessMessage(){
        return await this.successMessage.textContent()
      }

      async clickOnSubmitButton(){
        await this.submitButton.click();
      }

      async getRequiredFieldErrorMessage(){
        const validationMessage = await this.nameInput.evaluate((element) => {
            const input=element as HTMLInputElement
            return input.validationMessage // Get the native validation message
        });
        
        return validationMessage;
      }

}