import { expect, type Locator, type Page } from '@playwright/test';

export class SliderPage{
readonly page: Page;
readonly rangeSlider : Locator;
readonly sliderOutPut : Locator;

constructor(page: Page) {
    this.page = page;
    this.rangeSlider = page.locator('input[value="15"]')
    this.sliderOutPut = page.locator('#rangeSuccess');
  }

  async dragSlider(){
    let flag=false;
    const sliderBox = await this.rangeSlider.boundingBox();
    if(!sliderBox){
        throw new Error('Could not get the bounding box of the slider');
    }
    const sliderWidth = sliderBox.width; 
    let currentX = sliderBox.x; 
    const stepSize = 15;

    let rangeValue = await this.sliderOutPut.innerText();

    while (rangeValue.trim() !== '95') {
        currentX += stepSize;
        await this.page.mouse.move(currentX, sliderBox.y + sliderBox.height / 1);
        await this.page.mouse.down();
        await this.page.mouse.up();

        rangeValue = await this.sliderOutPut.innerText();
        console.log('Current slider value:', rangeValue);

        if (parseInt(rangeValue.trim()) > 95) {
            break;
        }
    }
  }

  async getUpdatedSliderValue(){
    return await this.sliderOutPut.innerText()
  }
}