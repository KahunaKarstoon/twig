import { Input } from '@angular/core';
import { browser, by, element, ElementFinder } from 'protractor';

const ownTag = '//app-events-list';

export class EventsList {

  get eventCount() {
    return browser.findElements(by.xpath(`${ownTag}//div[contains(@class, 'event-item')]`)).then(elements =>
      elements.length
    );
  }

  private getParentOfEventGroup(eventName): ElementFinder {
    return element(
      by.xpath(`//div[@class='overflow-scroll']//div[@class='card']//div[@class='card-block']//h4[text()="${eventName}"]/parent::*`));
  }

  startDeleteEventProcess(eventName) {
    const parent = this.getParentOfEventGroup(eventName);
    parent.element(by.css('i.fa-trash')).click();
  }

  previewEvent(eventName) {
    const parent = this.getParentOfEventGroup(eventName);
    browser.driver.actions().mouseMove(element(by.css('i.fa-eye'))).perform();
  }

  toggleEventCheck(eventName) {
    const parent = this.getParentOfEventGroup(eventName);
    // parent.element(by.css('input.custom-control-input')).click();
    parent.element(by.xpath(`//label//input[@class='custom-control-input]`));
  }

  checkedEvent(eventName) {
    const parent = this.getParentOfEventGroup(eventName);
    return parent.element(by.css('input.custom-control-input')).isSelected();
  }
}
