class Dashboard {
    constructor(driver) {
        this.driver = driver
    }

    /**
     * Button that triggers the click event to create a new post.
     * 
     * @returns {*} An event that trigger the click action.
     */
    async clickPostsButton() {
        let element = await this.driver.$('a[href="#/posts/"]');
        return await element.click();
    }

  /**
   * Function that clicks on New Post icon. 
   * 
   * @returns {*} Triggers a click event.
   */
    async clickPostsIcon() {
        let element = await this.driver.$('a[href="#/editor/post/"]');
        return await element.click();
    }

    async getCurrentUrl() {
        return await this.driver.getUrl();
    }
}

module.exports = Dashboard;
