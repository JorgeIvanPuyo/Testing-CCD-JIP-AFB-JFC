class Tag {

    constructor(driver) {
        this.driver = driver;

        this.tagsOptionElement = 'a[href="#/tags/"]'
        this.newTagButtonElement = 'a[href="#/tags/new/"]';
        this.tagNameElement = '#tag-name';
        this.tagColorElement = 'input[name="accent-color"]';
        this.tagSlugElement = '#tag-slug';
        this.tagDescriptionElement = '#tag-description';
        this.saveButtonElement = 'button[data-test-button="save"]';
        this.slugPreviewElement = '#tag-slug + p';
        this.tagsListElement = 'li.gh-list-row.gh-tags-list-item';
    }

    async goToTags() {
        return await this.driver.$(this.tagsOptionElement).click();
    }

    async clickNewTagButton() {
        return await this.driver.$(this.newTagButtonElement).click();
    }

    async setName(tagName) {
        return await this.driver.$(this.tagNameElement).setValue(tagName);
    }

    async setColor(colorCode) {
        return await this.driver.$(this.tagColorElement).setValue(colorCode);
    }

    async setSlug(slugName) {
        return await this.driver.$(this.tagSlugElement).setValue(slugName);
    }

    async isSlugWriteCorrectly(slugName) {
        let slugPreview = this.driver.$(this.slugPreviewElement);

        return await (slugPreview.search(`/${slugName}/`) > 0);
    }

    async setDescription(description) {
        return await this.driver.$(this.tagDescriptionElement)
            .setValue(description);
    }

    async save() {
        await this.driver.$(this.saveButtonElement).click();
    }

    async isTagCreated(tagName) {
        let tags = this.driver.$$(this.tagsListElement);
        let isCreated = false;
        
        for (let tag of tags) {
            let createdTagName = await tag.$('h3[data-test-tag-name]');

            if (createdTagName == tagName) {
                isCreated = true;
                break;
            }
        }

        return isCreated;
    }
}

module.exports = Tag;