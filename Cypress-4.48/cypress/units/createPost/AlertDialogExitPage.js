import { CreatePostPage } from "./CreatePostPage";

export class AlertDialogExitPage {
  $footerBottonsContainer;

  constructor(cy) {
    if (!cy) {
      throw new Error("Es requerida la instancia de cypress");
    }
    this.cy = cy;
  }

  clickStayButton() {
    if (!this.$footerBottonsContainer) {
      this.$footerBottonsContainer = cy.get(".modal-footer");
    }
    this.$footerBottonsContainer.children("button").contains("Stay").click();

    return new CreatePostPage(this.cy);
  }

  clickLeaveButton() {
    if (!this.$footerBottonsContainer) {
      this.$footerBottonsContainer = cy.get(".modal-footer");
    }
    this.$footerBottonsContainer.children("button").contains("Leave").click();
  }
}
