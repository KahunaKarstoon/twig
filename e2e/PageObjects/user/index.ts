import { FormsForModals } from './../FormsForModals/index';
import { browser, element, by } from 'protractor';
const defaultEmail = 'ben.hernandez@corp.riglet.io';
const localEmail = 'local@user'
const defaultPassword = 'Z3nB@rnH3n';
const localPassword = 'password';

const formForModals = new FormsForModals();

export class User {

  /**
   * Returns true if the user is currently logged in.
   *
   * @readonly
   * @type {PromiseLike<boolean>}
   * @memberOf User
   */
  get isLoggedIn(): PromiseLike<boolean> {
    return browser.isElementPresent(by.className('fa-sign-out'));
  }

  /**
   * Logs the tester in with the provided user name and password
   *
   * @param {any} username
   * @param {any} password
   *
   * @memberOf User
   */
  login(username, password) {
    return browser.isElementPresent(by.className('fa-sign-in')).then(present => {
      if (!present) {
        this.logout();
      }
      element(by.className('fa-sign-in')).click();
      formForModals.fillInTextFieldByLabel('Email', username);
      formForModals.fillInTextFieldByLabel('Password', password);
      formForModals.clickButton('Login');
    });
  }

  loginDefaultTestUser() {
    element(by.className('fa-info')).click();
    element(by.css('.db-url')).getText().then(value => {
      element(by.className('close')).click();
      if (value.includes('localhost')) {
        return this.login(localEmail, localPassword);
      }
      return this.login(defaultEmail, defaultPassword);
    });
  }

  /**
   * Logs the tester out.
   *
   *
   * @memberOf User
   */
  logout() {
    browser.isElementPresent(by.className('fa-sign-out')).then(present => {
      if (present) {
        element(by.className('fa-sign-out')).click();
      }
    });
  }
}
