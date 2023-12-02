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
            return this.cy.get('.posts-list .gh-posts-list-item-group li.gh-posts-list-item').first();
     }
    getDeleteButton() {
            return this.cy.get('button').contains('Delete')            ;}
    getDeleteConfirmationButton() {
            return this.cy.get('span[data-test-task-button-state="idle"]').contains('Delete');
        }
    getDraftPostToDelete() {
            // Selecciona el primer post con la etiqueta 'Draft' 
            return this.cy.get('li.gh-posts-list-item:contains("Draft")').first();
        }
    getCancelButton() {
        return this.cy.get('button').contains('Cancel');
    }

}



