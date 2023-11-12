class Posts {
    constructor(driver) {
        this.driver = driver
    }

    async clickNewPostButton() {
        let element = await this.driver.$('.gh-btn-primary');
        return await element.click();
    }

    async enterTittle(tittle) {
        let element = await this.driver.$('[data-test-editor-title-input]');
        return await element.setValue(tittle);
    }

    async enterContent(content) {
        let element = await this.driver.$('[role="textbox"]');
        return await element.setValue(content);
    }

    async clickPublishButton() {
        let element = await this.driver.$('button=Publish');
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
        let element = await this.driver.$('.gh-list-data');
        return await element.click();
    }

    async clickEditor() {
        let element = await this.driver.$('[data-test-button="close-publish-flow"]');
        return await element.click();
    }

    async clickPosts() {
        let element = await this.driver.$('[data-test-link="posts"]');
        return await element.click();
    }

    async countPosts() {
        let element = await this.driver.$$('.gh-list-row');
        return await element.length;
    }

    async getDraftFirstPost() {
        let firstPost = await this.driver.$('.gh-list-row:first-child');
        return await firstPost.getText();
    }

}

module.exports = Posts;

