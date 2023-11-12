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

    getPostSettings() {
        return this.cy.get('[data-test-psm-trigger]');
    }

    getPublisehModifyUrl() { return this.cy.get('#url').clear();}

    getPublishedModifyDate() { return this.cy.get('.gh-date-time-picker-date input[type="text"]').clear(); }
    getPublisehModifyHours() { return this.cy.get('input[data-test-date-time-picker-time-input]').clear();}
    getPublishedViewPost() {return this.cy.get('#entry-controls > div > div.settings-menu-content > form > section > div:nth-child(1) > a');}


    navigateToPostModifies(url) {
        cy.visit(`${APP_PAGE}/${url}`);
    }


}

