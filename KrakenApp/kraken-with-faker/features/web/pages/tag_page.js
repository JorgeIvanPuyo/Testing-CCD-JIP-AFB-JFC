class Tag {

    constructor(driver) {
        this.driver = driver;

        this.tagsOptionElement = 'a[href="#/tags/"]'
        this.newTagButtonElement = 'a[href="#/tags/new/"]';
        this.tagNameElement = '#tag-name';
        this.tagColorElement = 'input[data-test-input="accentColor"]';
        this.tagSlugElement = '#tag-slug';
        this.tagDescriptionElement = '#tag-description';
        this.saveButtonElement = 'button[data-test-button="save"]';
    }


}

module.exports = Tag;