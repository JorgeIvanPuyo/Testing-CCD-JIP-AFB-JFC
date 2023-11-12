import { PostsListPage } from "../postsList/PostsListPage";
import { PostPublishedPage } from "./PostPublishedPage";

export class CreatePostPage {
  constructor(cy) {
    if (!cy) {
      throw new Error("Es requerida la instancia de cypress");
    }
    this.cy = cy;
  }

  $addLabel;
  $addIcon;
  $addPostButton;
  $postTitleInput;
  $postDescription;
  $publishButton;
  $continueAndReviewButton;
  $pusblishRightNowButton;
  $settingsButton;
  $slug;
  $goToEditoButton;
  $goToPostsListLink;
  $updateButton;
  $goToPostsListFromPostModified;

  entryToPostListByLabel() {
    if (!this.$addLabel) {
      this.$addLabel = cy.get("a[data-test-nav='posts']");
    }
    this.$addLabel.click();

    if (!this.$addPostButton) {
      this.$addPostButton = cy.get("a[data-test-new-post-button]");
    }
    this.$addPostButton.click();
  }

  entryToPostListByIcon() {
    if (!this.$addIcon) {
      this.$addIcon = cy.get("a[data-test-nav='new-story']");
    }
    this.$addIcon.click();
  }

  #getForm() {
    if (!this.$postTitleInput) {
      this.$postTitleInput = cy.get("textarea[data-test-editor-title-input]");
    }

    if (!this.$postDescription) {
      this.$postDescription = cy.get("div[data-kg='editor']");
    }
  }

  fillPostTitle(postTitle) {
    this.#getForm();
    this.$postTitleInput.type(postTitle);
  }

  fillPostDescription(postDescription) {
    this.#getForm();
    this.$postDescription.type(postDescription);
  }

  clickPublishButton() {
    if (!this.$publishButton) {
      this.$publishButton = cy.get("button[data-test-button='publish-flow']");
    }

    this.$publishButton.click();
  }

  clickContinueAndReviewButton() {
    if (!this.$continueAndReviewButton) {
      this.$continueAndReviewButton = cy.get(
        "button[data-test-button='continue']"
      );
    }

    this.$continueAndReviewButton.click();
  }

  clickPublishPostRightNow() {
    if (!this.$pusblishRightNowButton) {
      this.$pusblishRightNowButton = cy.get(
        "button[data-test-button='confirm-publish']"
      );
    }

    this.$pusblishRightNowButton.click();
  }

  openSettings() {
    if (!this.$settingsButton) {
      this.$settingsButton = cy.get("button[data-test-psm-trigger]");
    }

    this.$settingsButton.click();
  }

  closeSettings() {
    if (!this.$settingsButton) {
      this.$settingsButton = cy.get("button[data-test-psm-trigger]");
    }

    this.$settingsButton.click();
  }

  getUpdateButton() {
    if (!this.$updateButton) {
      this.$updateButton = cy.get("button[data-test-button='publish-save']");
    }

    return this.$updateButton;
  }

  unpublishPost() {}

  goToEdit() {
    if (!this.$goToEditoButton) {
      this.$goToEditoButton = cy.get(
        "button[data-test-button='close-publish-flow']"
      );
    }

    this.$goToEditoButton.click();
  }

  goToPostList() {
    if (!this.$goToPostsListLink) {
      this.$goToPostsListLink = cy.get("a[data-test-link='posts']");
    }

    this.$goToPostsListLink.click();

    return new PostsListPage(this.cy);
  }

  goToPostsListFromPostNotModified() {
    if (!this.$goToPostsListFromPostModified) {
      this.$goToPostsListFromPostModified = cy.get("a[data-test-link='posts']");
    }
    this.$goToPostsListFromPostModified.click();

    return new PostsListPage(this.cy);
  }

  validatePostPublished() {
    return new PostPublishedPage(this.cy);
  }
}
