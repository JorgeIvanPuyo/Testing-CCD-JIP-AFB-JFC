class Members {

    constructor(driver) {
        this.driver = driver;
      }

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

      /**
       * When the modal dialog that appears when we're created a new member,
       * the function allows to click on the button to leave the form.
       * 
       * @returns {*}
       */
      async clickLeaveButtonModalDialog() {
        return await this.driver.$('button[data-test-leave-button]').click();
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
       * Returns the actual registered members.
       * 
       * @returns {string} : The amount of members registered.
       */
      async getActualMembers() {
        let element = await this.driver.$('tr[data-test-list="members-list-item"]');
        
        return await element.length;
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
        
        let labelsElement = await this.driver.$('.ember-power-select-trigger-multiple-input');
        await labelsElement.setValue(labels);

        let element3 = await this.driver.$('#member-note');
        await element3.setValue(note);

        this.clickMembers();
      }

      async getInvalidResponse(selector) {
        let element = await this.driver.$(selector)
        return await element.getText();
      }

      async clickStayButtonModalDialog() {
        return await this.driver.$('button[data-test-stay-button]').click();
      }

    }

module.exports = Members;
  