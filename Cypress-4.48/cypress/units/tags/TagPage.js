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
    getNewTagButton() {
        return this.cy.get('a[href="#/tags/new/"]');
    }
    
    getTagNameInput() {
        return this.cy.get('input[type="text"][name="name"]');
    }
    
    getTagAccentColorInput() {
        return this.cy.get('input[name="accent-color"].gh-input');
    }
    
    getTagSlugInput() {
        return this.cy.get('input#tag-slug');
    }
    
    getTagSlugPreview() {
        return this.cy.get('p.ghost-url-preview');
    }
    
    getTagDescriptionTextarea() {
        return this.cy.get('textarea#tag-description');
    }
    
    getSaveButton() {
        return this.cy.get('button.gh-btn.gh-btn-primary.gh-btn-icon').contains('Save');
    }
    

    getSaveButtonSuccess() {
        return this.cy.get('span[data-test-task-button-state="success"]');
    }





}  