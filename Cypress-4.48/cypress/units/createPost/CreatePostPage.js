import { PostsListPage } from "../postsList/PostsListPage";
import { AlertDialogExitPage } from "./AlertDialogExitPage";
import { PostPublishedPage } from "./PostPublishedPage";
import { SettingsPostPage } from "./SettingsPostPage";

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
  $unpublishButton;
  $unpublishAndRevertToDraftButton;

  entryToPostListByLabel() {
    if (!this.$addLabel) {
      this.$addLabel = cy.get(".gh-nav-list-new a[href='#/posts/']");
    }
    this.$addLabel.click();

    if (!this.$addPostButton) {
      this.$addPostButton = cy.get(".view-actions a.gh-btn-primary");
    }
    this.$addPostButton.click();
  }

  entryToPostListByIcon() {
    if (!this.$addIcon) {
      this.$addIcon = cy.get(".gh-nav-list-new .gh-nav-new-post");
    }
    this.cy.wait(500);
    this.$addIcon.click();
    this.cy.wait(500);

    return new CreatePostPage(this.cy);
  }

  #getForm() {
    if (!this.$postTitleInput) {
      this.$postTitleInput = cy.get("textarea[placeholder='Post title']");
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
      this.$publishButton = cy.get(
        ".gh-publishmenu.ember-view div[role='button']"
      );
    }

    this.$publishButton.click();
  }

  clickContinueAndReviewButton() {
    if (!this.$continueAndReviewButton) {
      this.$continueAndReviewButton = cy.get(
        ".gh-publishmenu-footer .gh-btn-black"
      );
    }

    this.$continueAndReviewButton.click();
  }

  clickPublishPostRightNow() {
    if (!this.$pusblishRightNowButton) {
      this.$pusblishRightNowButton = cy.get(".modal-footer .gh-btn-black");
    }

    this.$pusblishRightNowButton.click();
  }

  openSettings() {
    if (!this.$settingsButton) {
      this.$settingsButton = cy.get("button[data-test-psm-trigger]");
    }

    this.$settingsButton.click();

    return new SettingsPostPage(this.cy);
  }

  closeSettings() {
    if (!this.$settingsButton) {
      this.$settingsButton = cy.get("button[data-test-psm-trigger]");
    }

    this.$settingsButton.click();
  }

  getUpdateButton() {
    if (!this.$updateButton) {
      this.$updateButton = cy.get(
        ".gh-publishmenu .ember-basic-dropdown-trigger"
      );
    }

    return this.$updateButton;
  }

  clickUpDateButton() {
    if (!this.$updateButton) {
      this.$updateButton = cy.get("button[data-test-button='publish-save']");
    }

    this.$updateButton.click();
  }

  unpublishPost() {
    if (!this.$unpublishButton) {
      this.$unpublishButton = cy.get("button[data-test-button='update-flow']");
    }

    this.$unpublishButton.click();
    this.cy.wait(1000);

    if (!this.$unpublishAndRevertToDraftButton) {
      this.$unpublishAndRevertToDraftButton = cy.get(
        "button[data-test-button='revert-to-draft']"
      );
    }

    this.$unpublishAndRevertToDraftButton.click();
  }

  clickUnpublishPost() {
    if (!this.$unpublishButton) {
      this.$unpublishButton = cy.get("button[data-test-button='update-flow']");
    }

    this.$unpublishButton.click();
  }

  clickUnpublishPostAndRevertToDraft() {
    if (!this.$unpublishAndRevertToDraftButton) {
      this.$unpublishAndRevertToDraftButton = cy.get(
        "button[data-test-button='revert-to-draft']"
      );
    }

    this.$unpublishAndRevertToDraftButton.click();
  }

  goToEdit() {
    if (!this.$goToEditoButton) {
      this.$goToEditoButton = cy.get(".modal-footer button[type='button']");
    }

    this.$goToEditoButton.click();
  }

  goToPostsList() {
    if (!this.$goToPostsListLink) {
      this.$goToPostsListLink = cy.get(".gh-editor-header a[href='#/posts/']");
    }

    this.$goToPostsListLink.click();

    return new PostsListPage(this.cy);
  }

  goToPostsListWithOutSave() {
    if (!this.$goToPostsListLink) {
      this.$goToPostsListLink = cy.get(".gh-editor-header a[href='#/posts/']");
    }

    this.$goToPostsListLink.click();
    return new AlertDialogExitPage(this.cy);
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
