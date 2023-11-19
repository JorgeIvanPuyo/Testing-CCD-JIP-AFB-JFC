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
        return this.cy.get('li.gh-posts-list-item:contains("Published")').first();
    }

    getPostDraftToModify() {
        // Selecciona el primer post con la etiqueta 'Draft' 
        return this.cy.get('li.gh-posts-list-item:contains("Draft")').first();
    }

    getPostSettings() {
        return this.cy.get('[data-test-psm-trigger]');
    }

    getPublisehModifyUrl() { return this.cy.get('#url').clear();}

    getPublishedModifyDate() { return this.cy.get('.gh-date-time-picker-date input[type="text"]').clear(); }
    getPublisehModifyHours() { return this.cy.get('input[data-test-date-time-picker-time-input]').clear();}
    getPublishedViewPost() {return this.cy.get('#entry-controls > div > div.settings-menu-content > form > section > div:nth-child(1) > a');}
    getTagInputDiv() {
        return this.cy.get('#tag-input');
    }
    getFirstEmberPowerSelectOption() {
        return this.cy.get('ul.ember-power-select-options li.ember-power-select-option').first();
    }
    getUpdateButton() {
        return this.cy.get('span[data-test-task-button-state="idle"]').contains('Update');
    }
    getLeaveButton() {
        return this.cy.get('button.gh-btn.gh-btn-red').contains('Leave');
    }
    
    getFirstTagOption() {
        return this.cy.get('input.ember-power-select-trigger-multiple-input');
    }
    
    
    

    navigateToPostModifies(url) {
        cy.visit(`${APP_PAGE}/${url}`);
    }


}

