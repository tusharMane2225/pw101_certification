import { SeleniumPlaygroundPage } from '../pageObjects/SeleniumPlaygroundPage';
import { SimpleFormDemoPage } from '../pageObjects/SimpleFormDemoPage';
import { InputFormPage } from '../pageObjects/InputFormPage';
import { SliderPage } from '../pageObjects/SliderPage';
import test from "../lambdatest-setup";
import { expect } from "@playwright/test";

test.describe('LambdaTest Playwright 101 Assignment', async() => {
  let seleniumDemoPage:SeleniumPlaygroundPage;
  test.beforeEach(async({page})=>{
     seleniumDemoPage = new SeleniumPlaygroundPage(page)
    await seleniumDemoPage.goTo();
  })
  
  test('Test Scenario 1: Simple Form Demo', async ({ page }) => {
  
    const inputMessage = 'Welcome to LambdaTest';
    const simpleFormDemoPage = new SimpleFormDemoPage(page);   

    await seleniumDemoPage.clickOnSimpleFormDemo();
    await expect(page).toHaveURL(/.*simple-form-demo/);

    await simpleFormDemoPage.enterInputMessage(inputMessage);
    await simpleFormDemoPage.clickOnGetCheckedValue();

    const outputMessage=await simpleFormDemoPage.getOutputMessage();

    expect(inputMessage).toBe(outputMessage);
  });

  test('Test Scenario 2: Drag and Drop Slider to 95', async ({ page }) => {
      const sliderPage =new SliderPage(page)
      seleniumDemoPage.clickOnDragAndDropSliderLink()

      await sliderPage.dragSlider();
      const value=await sliderPage.getUpdatedSliderValue()

      expect(value).toBe('95')


  });


  test.skip('Test Scenario 3: Input Form Submit', async ({ page }) => {

      //****************** Click on submit without filling form and validate error message */
      const inputFormPage = new InputFormPage(page)

      await seleniumDemoPage.clickOnInputFormSubmitLink();

      await inputFormPage.clickOnSubmitButton()

      const errorMessage= await inputFormPage.getRequiredFieldErrorMessage();
      expect(errorMessage).toBe("Please fill out this field.");

      //****************** Fill form and validate success message */
      await inputFormPage.fillForm();
      const successMessage=await inputFormPage.getSuccessMessage()
      expect(successMessage).toBe('Thanks for contacting us, we will get back to you shortly.')
  });
  
})
