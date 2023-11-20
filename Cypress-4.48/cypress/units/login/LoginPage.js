import { PostsListPage } from "../postsList/PostsListPage";

export class HomePage {
  $postsButton;

  constructor(cy) {
    if (!cy) {
      throw new Error("Es requerida la instancia de cypress");
    }
    this.cy = cy;
  }

  getUrl() {
    return this.cy.url();
  }

  goToPostsList() {
    if (!this.$postsButton) {
      this.$postsButton = cy.get('.gh-nav-list-new  a[href="#/posts/"]');
    }
    this.$postsButton.click();

    return new PostsListPage(this.cy);
  }
}
