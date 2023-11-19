import { PostsListPage } from "../postsList/PostsListPage";

export class HomePage {
  $postsButton = cy.get('a[href="#/posts/"]');

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
    this.$postsButton.click();

    return new PostsListPage(this.cy);
  }
}
