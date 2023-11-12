import { PostPublishedPage } from "./PostPublishedPage";

export class CreatePostPage {
  constructor(cy, win) {
    if (!cy || !win) {
      throw new Error("Es requerida la instancia de cypress");
    }
    this.cy = cy;
    this.win = win;
  }

  $addLabel = cy.get("a[data-test-nav='posts']");
  $addIcon = cy.get("a[data-test-nav='new-story']");
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

  entryToPostListByLabel() {
    this.$addLabel.click();

    if (!this.$addPostButton) {
      this.$addPostButton = cy.get("a[data-test-new-post-button]");
    }
    this.$addPostButton.click();
  }

  entryToPostListByIcon() {
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
  }

  validatePostPublished() {
    return new PostPublishedPage(this.cy);
  }
}
