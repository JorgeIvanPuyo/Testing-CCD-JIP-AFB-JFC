import {ModifyPostPage} from '../modifyPost/ModifyPostPage'


export class TagPage {
    constructor(cy) {
      if (!cy) {
        throw new Error("Es requerida la instancia de cypress");
      }
      this.cy = cy;
    }

    navigateToTags() {
        cy.visit('/ghost/#/tags');
    
    }
    navigateToCreateTags() { this.cy.visit('/ghost/#/tags/new'); }
    getNewTagButton() {
        return cy.get('a[href="#/tags/new/"].ember-view.gh-btn.gh-btn-primary');
    }
    
    getTagNameInput() {
        return this.cy.get('input[name="name"][data-test-input="tag-name"]');
    }
    
    getTagAccentColorInput() {
        return this.cy.get('input[name="accent-color"][data-test-input="accentColor"]');
    }
    
    getTagSlugInput() {
        return this.cy.get('input[name="slug"][data-test-input="tag-slug"]');
    }
    
    getTagSlugPreview() {
        return this.cy.get('p.ghost-url-preview');
    }
    
    getTagDescriptionTextarea() {
        return this.cy.get('textarea[name="description"][data-test-input="tag-description"]');
    }
    
    getSaveButton() {
        return this.cy.get('span[data-test-task-button-state="idle"]').contains('Save');
    }
    

    getSaveButtonSuccess() {
        return this.cy.get('span[data-test-task-button-state="success"]');
    }

    getInternalTag()
    {
        return this.cy.get('button[data-test-tags-nav="internal"]');
    }

    getCreateNewTagInternal() {
        return this.cy.contains('span', 'Create a new tag');
    }
    



}  