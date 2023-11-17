class Members {

    constructor(driver) {
        this.driver = driver;
      }

      /**
       * Clicks on Members's option.
       * 
       * @returns {*} An event that clicks on Members's option.
       */
      async clickMembers() {
        let element = await this.driver.$('a[data-test-nav="members"]');
        return await element.click();
      }

      async getCurrentUrl() {
        return await this.driver.getUrl();
      }

      async clickNewMemberButton() {
        let element = await this.driver.$('a[href="#/members/new/"]');
        return await element.click();
      }

      async createNewMember(name, email, note) {
        let element = await this.driver.$('#member-name');
        await element.setValue(name);
        let element2 = await this.driver.$('#member-email');
        await element2.setValue(email);
        let element3 = await this.driver.$('#member-note');
        await element3.setValue(note);
        let element4 = await this.driver.$('.gh-btn-primary');
        return await element4.click();
      }

      async getState() {
        let element = await this.driver.$('.gh-member-details-attribution');
        return await element.getText();
      }
      
      /**
       * Type all fields and then clicks on Members's option.
       * 
       * @param {string} name 
       * @param {string} email 
       * @param {string} labels 
       * @param {string} note 
       */
      async typeNewMemberFieldsAndReturn(name, email, labels, note) {
        let element = await this.driver.$('#member-name');
        await element.setValue(name);
        
        let element2 = await this.driver.$('#member-email');
        await element2.setValue(email);
        
        let labelsElement = await this.driver.$('.label-token > input');
        await labelsElement.setValue(labels);

        let element3 = await this.driver.$('#member-note');
        await element3.setValue(note);

        this.clickMembers();
      }

    }

module.exports = Members;
  