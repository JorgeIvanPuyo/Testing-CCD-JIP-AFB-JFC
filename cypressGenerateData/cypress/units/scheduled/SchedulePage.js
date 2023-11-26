import { CreatePostPage } from "../createPost/CreatePostPage";

export class SchedulePage {

    $addPostButton = cy.get("a[data-test-new-post-button]");

    constructor(cy) {
        if (!cy) {
            throw new Error("Es requerida la instancia de cypress");
        }
        this.cy = cy;
    }

    getUrl() {
        return this.cy.url();
    }

    goToCreatePost() {
        this.$addPostButton.click();
    
        return new CreatePostPage(this.cy);
      }
}