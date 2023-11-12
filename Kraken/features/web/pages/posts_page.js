class Posts {
    constructor(driver) {
        this.driver = driver
    }

    async clickNewPostButton() {
        let element = await this.driver.$('#ember78');
        return await element.click();
    }

    async enterTittle(tittle) {
        let element = await this.driver.$('#ember93');
        return await element.setValue(tittle);
    }

    async enterContent(content) {
        let element = await this.driver.$('#ember89 > div.gh-koenig-editor.relative.z-0 > div.gh-koenig-editor-pane.flex.flex-column.mih-100 > div:nth-child(3) > div > div > div:nth-child(1) > div > p');
        return await element.setValue(content);
    }

    async clickOnAPost() {
        let element = await this.driver.$('h3.gh-content-entry-title');
        return await element.click();
    }

    async unplublishPost() {
        let element = await this.driver.$('button.gh-btn.gh-btn-editor.darkgrey.gh-unpublish-trigger');

        return await element.click();
    }

    async confirmUnpublish() {
        let element = await this.driver.$('button[data-test-button="revert-to-draft"]');
        return await element.click();
    }

    async modifyPostTitle(title) {
        let element = await this.driver.$('textarea.gh-editor-title.ember-text-area.gh-input.ember-view');
        return await element.setValue(title);
    }

    async modifyPostBody(body) {
        let element = await this.driver.$(
            'div[data-lexical-editor="true"] p[data-koenig-dnd-droppable="true"]');
        return await element.setValue(body);
    }
}

module.exports = Posts;

