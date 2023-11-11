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
}

module.exports = Posts;

