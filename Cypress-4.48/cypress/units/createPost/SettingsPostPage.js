import { AlertDialogDeletePage } from "./AlertDialogDeletePage";
import { CreatePostPage } from "./CreatePostPage";

export class SettingsPostPage {
  constructor(cy) {
    if (!cy) {
      throw new Error("Es requerida la instancia de cypress");
    }
    this.cy = cy;
  }

  openSettings() {}

  closeSettings() {
    if (!this.$settingsButton) {
      this.$settingsButton = cy.get("button[data-test-psm-trigger]");
    }

    this.$settingsButton.click();

    return new CreatePostPage(this.cy);
  }

  clickDeletePost() {
    if (!this.$deletePostButton) {
      this.$deletePostButton = cy.get(".settings-menu-delete-button");
    }

    this.$deletePostButton.click();

    return new AlertDialogDeletePage(this.cy);
  }
}
