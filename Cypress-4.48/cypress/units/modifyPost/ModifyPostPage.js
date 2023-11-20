import { APP_PAGE } from "../../const";
 
export class ModifyPostPage {
    constructor(cy) {
      if (!cy) {
        throw new Error("Es requerida la instancia de cypress");
      }
      this.cy = cy;
    }

    navigateToPosts() {
        cy.visit('/ghost/#/posts');
    }

    getPublishedPostToModify() {
        // Selecciona el primer post con la etiqueta 'Draft' 
        return this.cy.get('li.gh-list-row.gh-posts-list-item').contains('Published').first();
    }

    getPostDraftToModify() {
        // Selecciona el primer post con la etiqueta 'Draft' 
        return  this.cy.get('li.gh-list-row.gh-posts-list-item').contains('Draft').first();
    }

    getSettingsButton() {
        return cy.get('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon');

    }

    getPublisehModifyUrl() { return this.cy.get('#url').clear();}

    getPublishedModifyDate() { return this.cy.get('.gh-date-time-picker-date input[type="text"]').clear(); }
    getPublisehModifyHours() { return this.cy.get('.gh-date-time-picker-time input[type="text"]').clear(); }
    getPublishedViewPost() {return this.cy.get('a.post-view-link');}
    getTagInputDiv() {
        return this.cy.get('#tag-input');
    }
    getFirstEmberPowerSelectOption() {
        return this.cy.get('ul.ember-power-select-options li.ember-power-select-option').first();
    }
    getUpdateButton() {
        return this.cy.get('div.gh-btn-editor.green').contains('Update');
    }
    getLeaveButton() {
        return this.cy.get('button.gh-btn.gh-btn-red').contains('Leave');
    }
    
    getFirstTagOption() {
        return this.cy.get('input.ember-power-select-trigger-multiple-input');
    }
    
    getUrlPreviewDescription() {
        return cy.get('.ghost-url-preview.description');
      }    
    
    

    navigateToPostModifies(url) {
        cy.visit(`${APP_PAGE}/${url}`);
    }


}

