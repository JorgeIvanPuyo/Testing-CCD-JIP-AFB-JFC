class Posts {

  constructor(driver) {
    this.driver = driver;
  }

  /**
   * Function that clicks on New Post button. 
   * 
   * @returns {*} Triggers a click event.
   */
  async clickNewPostButton() {
    let element = await this.driver.$('a[href="#/editor/post/"]');
    return await element.click();
  }

  /**
   * Enters a new title.
   * 
   * @param {string} tittle 
   * @returns {*} An event that sets a new title value
   */
  async enterTittle(tittle) {
    let element = await this.driver.$('textarea[placeholder="Post title"]');
    return await element.setValue(tittle);
  }

  async deleteTittle() {
    let element = await this.driver.$("[data-test-editor-title-input]");
    return await element.setValue("");
  }

  /**
   * Enter new content for the post.
   * 
   * @param {string} content 
   * @returns 
   */
  async enterContent(content) {
    let element = await this.driver.$('div[data-kg="editor"]');
    return await element.setValue(content);
  }

  async deleteContent() {
    let element = await this.driver.$('[role="textbox"]');
    return await element.setValue("");
  }

  /**
   * Select the publish button element and triggers the action.
   * 
   * @returns {*} The action to triggers the action to publish a post.
   */
  async clickPublishButton() {
    let element = await this.driver.$('div.gh-publishmenu-trigger');
    return await element.click();
  }

  /**
   * When clickPlublishButton opens a new dialog to publish the post, this 
   * function triggers the click event to publish the post.
   * 
   * @returns {*} The event to triggers the click event.
   */
  async clickPublishButtonDialog() {
    let button = await this.driver.$('.gh-publishmenu-button');
    return await button.click();
  }

  /**
   * 
   * @returns 
   */
  async clickPublishButtonDialogConfirm() {
    let button = await this.driver.$('button.gh-btn.gh-btn-black.gh-btn-icon.ember-view');

    return await button.click();
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

  /**
   * Reference a button called Posts that returns to the posts list.
   * 
   * @returns {*} A clickable event to turn backk to the posts list.
   */
  async clickPosts() {
    let element = await this.driver.$('a.gh-editor-back-button');
    return await element.click();
  }

  /**
   * Counts the amount of post registered.
   * 
   * @returns {number} The amount of post registered.
   */
  async countPosts() {
    let element = await this.driver.$$(".gh-list-row");
    return await element.length;
  }

  /**
   * Get the first post from the posts list.
   * 
   * @returns {*} An element with the post information.
   */
  async getDraftFirstPost() {
    let firstPost = await this.driver.$(".gh-list-row.gh-posts-list-item:first-child");
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
}

module.exports = Posts;
