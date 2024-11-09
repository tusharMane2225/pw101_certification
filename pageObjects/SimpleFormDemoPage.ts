import { expect, type Locator, type Page } from '@playwright/test';

export class SimpleFormDemoPage{
    readonly page: Page;
    readonly messageInput :Locator;
    readonly getCheckedValueButton: Locator;
    readonly outputMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.messageInput = page.getByPlaceholder('Please enter your Message')
        this.getCheckedValueButton = page.locator('button', { hasText: 'Get Checked Value' });
        this.outputMessage = page.locator('#message');
      }

      async enterInputMessage(input : string){
        await this.messageInput.fill(input);
      }

      async clickOnGetCheckedValue(){
        await this.getCheckedValueButton.click();
      }

      async getOutputMessage(){
        return await this.outputMessage.innerText();
      }
}