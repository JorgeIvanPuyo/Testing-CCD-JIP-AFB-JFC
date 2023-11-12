import { CreatePostPage } from "../createPost/CreatePostPage";

export class PostsListPage {
  $postsListTitle = cy.get("li.gh-list-row");

  constructor(cy) {
    if (!cy) {
      throw new Error("Es requerida la instancia de cypress");
    }
    this.cy = cy;
  }

  getPostByTitle(title) {
    return this.$postsListTitle
      .children("a")
      .children(".gh-content-entry-title")
      .contains("h3", title)
      .parent("a")
      .parent("li");
  }

  getStatusPost($li) {
    return $li
      .children("a")
      .children(".gh-content-entry-status")
      .children("span");
  }

  goToEditPost($li) {
    $li.children("a").children("span[title='Go to Editor']").click();

    return new CreatePostPage(this.cy);
  }
}
