import { CreatePostPage } from "../createPost/CreatePostPage";

export class PostsListPage {
  $postsListTitle = cy.get("li.gh-list-row");
  $addPostButton = cy.get("a[data-test-new-post-button]");
  $postListContainer;

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

  getPostPublished() {
    return this.$postsListTitle
      .children("a")
      .children(".gh-content-entry-status")
      .children(".published")
      .first()
      .parent("p")
      .parent("a")
      .parent("li");
  }

  selectAPostPublished() {
    this.getPostPublished().click();

    return new CreatePostPage(this.cy);
  }

  getStatusPost($li) {
    return $li
      .children("a")
      .children(".gh-content-entry-status")
      .children("span");
  }

  scrollBotton() {
    if (!this.$postListContainer) {
      this.$postListContainer = cy.get(".gh-main");
    }
    this.$postListContainer.scrollTo("bottom");
  }

  goToEditPost($li) {
    $li.children("a").children("span[title='Go to Editor']").click();

    return new CreatePostPage(this.cy);
  }

  goToCreatePost() {
    this.$addPostButton.click();

    return new CreatePostPage(this.cy);
  }
}
