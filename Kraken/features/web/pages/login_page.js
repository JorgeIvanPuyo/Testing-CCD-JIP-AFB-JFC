class LoginPage {
    constructor(driver) {
      this.driver = driver;
    }
  
    async enterEmail(email) {
      let element = await this.driver.$('[name="identification"]');
      return await element.setValue(email);
    }
  
    async enterPassword(password) {
      let element = await this.driver.$('[name="password"]');
      return await element.setValue(password);
    }
  
    async clickSignInButton() {
      let element = await this.driver.$('[type="submit"]');
      return await element.click();
    }
  
    async getCurrentUrl() {
      return await this.driver.getUrl();
    }
  }
  
  module.exports = LoginPage;