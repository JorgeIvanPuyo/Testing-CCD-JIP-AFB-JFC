export class DeletePostPage {
    constructor(cy) {
      if (!cy) {
        throw new Error("Es requerida la instancia de cypress");
      }
      this.cy = cy;
    }

$post;
$postToDelete;
$deleteButton;
$deleteConfirmation;
$cancelButton;

    navigateToPosts() {
        cy.visit('/ghost/#/posts');
    }
    getPostToDelete() { 
            return this.cy.get('li.gh-list-row.gh-posts-list-item').contains('Published').first();
     }
    getDeleteButton() {
            return this.cy.get('button').contains('Delete')            ;}
    getDeleteConfirmationButton() {
            return this.cy.get('.gh-btn.gh-btn-red.gh-btn-icon').contains('Delete');
        }
    getDraftPostToDelete() {
            // Selecciona el primer post con la etiqueta 'Draft' 
            return this.cy.get('li.gh-posts-list-item:contains("Draft")').first();
        }
    getCancelButton() {
        return this.cy.get('button').contains('Cancel');
    }
    getSettingsButton() {
        return cy.get('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon');

    }
    
    

}



