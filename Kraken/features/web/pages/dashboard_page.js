class Dashboard {
    constructor(driver) {
        this.driver = driver
    }

    async clickPostsButton() {
        let element = await this.driver.$('[data-test-nav="posts"]');
        return await element.click();
    }

    async getCurrentUrl() {
        return await this.driver.getUrl();
    }
}

module.exports = Dashboard;
