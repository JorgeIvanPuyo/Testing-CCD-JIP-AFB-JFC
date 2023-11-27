class Posts {
  constructor(driver) {
    this.driver = driver;
  }

  async clickNewPostButton() {
    let element = await this.driver.$('[data-test-new-post-button]');
    return await element.click();
  }

  async enterTittle(tittle) {
    let element = await this.driver.$('[data-test-editor-title-input]');
    return await element.setValue(tittle);
  }

  async deleteTittle() {
    let element = await this.driver.$("[data-test-editor-title-input]");
    return await element.setValue("");
  }

  async enterContent(content) {
    let element = await this.driver.$('[role="textbox"]');
    return await element.setValue(content);
  }

  async deleteContent() {
    let element = await this.driver.$('[role="textbox"]');
    return await element.setValue("");
  }

  async clickPublishButton() {
    let element = await this.driver.$("button=Publish");
    return await element.click();
  }

  async clickContinue() {
    let element = await this.driver.$('[data-test-button="continue"]');
    return await element.click();
  }

  async clickPostNow() {
    let element = await this.driver.$('[data-test-button="confirm-publish"]');
    return await element.click();
  }

  async clickPreview() {
    let element = await this.driver.$('[data-test-complete-bookmark=""]');
    return await element.click();
  }

  async getCurrentUrl() {
    return await this.driver.getUrl();
  }

  async clickOnAPost() {
    let element = await this.driver.$(".gh-list-data");
    return await element.click();
  }

  async clickEditor() {
    let element = await this.driver.$(
      '[data-test-button="close-publish-flow"]'
    );
    return await element.click();
  }

  async clickPosts() {
    let element = await this.driver.$('[data-test-link="posts"]');
    return await element.click();
  }

  async countPosts() {
    let element = await this.driver.$$(".gh-list-row");
    return await element.length;
  }

  async getDraftFirstPost() {
    let firstPost = await this.driver.$(".gh-list-row:first-child");
    return await firstPost.getText();
  }

  async clickEditPost() {
    let element = await this.driver.$(".gh-list-data:first-child");
    return await element.click();
  }

  async getAllPosts() {
    let element = await this.driver.$$(".gh-list-row");
    return await element;
  }

  async clickOnElement(element) {
    return await element.click();
  }

  async clickSettings() {
    let element = await this.driver.$(".settings-menu-toggle");
    return await element.click();
  }

  async clickDelete() {
    let element = await this.driver.$(".settings-menu-delete-button button");
    return await element.click();
  }

  async confirmDelete() {
    let element = await this.driver.$(".gh-btn-red");
    return await element.click();
  }

  async cancelDelete() {
    let element = await this.driver.$(".gh-btn:first-child");
    return await element.click();
  }

  async backToPostsButton() {
    let backToPostElement = await this.driver.$('a[data-test-link="posts"]')

    return await backToPostElement.click();
  }

  async updatePost() {
      let updateButton = await this.driver.$('button[data-test-button="publish-save"]');

      return await updateButton.click();
  }

  async clickOnSettings() {
    let settingsButton = await this.driver.$('button[title="Settings"]');

    return await settingsButton.click();
  }

  async unpublishPost() {
    let unpublishButton = await this.driver.$('button[data-test-button="update-flow"]');
    return await  unpublishButton.click();
  }

  async confirmUnpublish() {
    let unpublishConfirmButton = await this.driver.$('button[data-test-button="revert-to-draft"]');
    return await  unpublishConfirmButton.click();
  }
}

module.exports = Posts;
