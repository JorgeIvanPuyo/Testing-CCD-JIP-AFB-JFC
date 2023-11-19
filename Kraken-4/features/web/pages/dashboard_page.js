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
        let element = await this.driver.$('.gh-nav-new-post');
        return await element.click();
    }

    async clickPostsIcon() {
        let element = await this.driver.$('[data-test-nav="new-story"]');
        return await element.click();
    }

    async getCurrentUrl() {
        return await this.driver.getUrl();
    }
}

module.exports = Dashboard;
