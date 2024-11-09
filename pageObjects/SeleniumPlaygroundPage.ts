import { expect, type Locator, type Page } from '@playwright/test';

export class SeleniumPlaygroundPage{
    readonly page: Page;
    readonly simpleFormDemoLink :Locator;
    readonly dragAndDropSliderLink: Locator;
    readonly inputFormSubmitLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.simpleFormDemoLink = page.locator('a', { hasText: 'Simple Form Demo' });
        this.dragAndDropSliderLink = page.locator('a', { hasText: 'Drag & Drop Sliders' });
        this.inputFormSubmitLink = page.locator('a', { hasText: 'Input Form Submit' });
      }

      async goTo(){
        await this.page.goto('https://www.lambdatest.com/selenium-playground')
      }

      async clickOnSimpleFormDemo(){
        await this.simpleFormDemoLink.click();
      }

      async clickOnDragAndDropSliderLink(){
        await this.dragAndDropSliderLink.click();
      }

      async clickOnInputFormSubmitLink(){
        await this.inputFormSubmitLink.click();
      }
    
}