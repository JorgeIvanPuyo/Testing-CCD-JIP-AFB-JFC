import { CreatePostPage } from "../createPost/CreatePostPage";

export class PostsListPage {
  $postsListTitle;
  $addPostButton = cy.get("a[href='#/editor/post/']");
  $postListContainer;

  constructor(cy) {
    if (!cy) {
      throw new Error("Es requerida la instancia de cypress");
    }
    this.cy = cy;
  }

  getPostByTitle(title) {
    if (!this.$postsListTitle) {
      this.$postsListTitle = cy.get("li.gh-list-row.gh-posts-list-item");
    }
    console.log("title: ", title);
    console.log("***", title.length);
    return this.$postsListTitle
      .children("a")
      .first()
      .children(".gh-content-entry-title")
      .parent("a")
      .parent("li");
  }

  getPostPublished() {
    if (!this.$postsListTitle) {
      this.$postsListTitle = cy.get("li.gh-list-row.gh-posts-list-item");
    }
    return this.$postsListTitle
      .children("a")
      .children("div")
      .children(".gh-content-status-published")
      .first()
      .parent("div")
      .parent("a")
      .parent("li");
  }

  selectAPostPublished() {
    this.getPostPublished().click();

    return new CreatePostPage(this.cy);
  }

  selectAPostPublishedEdit() {
    return false;
  }

  getStatusPost($li) {
    return $li.children("a").children(".gh-post-list-status").children("span");
  }

  getPostTitle(elem) {
    return elem
      .children("a")
      .children(".gh-content-entry-title")
      .children("h3");
  }

  scrollBotton() {
    if (!this.$postListContainer) {
      this.$postListContainer = cy.get(".gh-main");
    }
    this.$postListContainer.scrollTo("bottom");
  }

  goToEditPostUnpublish($li) {
    $li.children("a").children("span[title='Go to Editor']").click();

    return new CreatePostPage(this.cy);
  }

  goToEditPostPublish($li) {
    $li.click();

    return new CreatePostPage(this.cy);
  }

  goToCreatePost() {
    this.$addPostButton.click();

    return new CreatePostPage(this.cy);
  }
}
