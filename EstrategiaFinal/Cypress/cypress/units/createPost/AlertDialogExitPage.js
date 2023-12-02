import { CreatePostPage } from "./CreatePostPage";

export class AlertDialogExitPage {
  $footerBottonsContainer = cy.get(".modal-footer");

  constructor(cy) {
    if (!cy) {
      throw new Error("Es requerida la instancia de cypress");
    }
    this.cy = cy;
  }

  clickStayButton() {
    this.$footerBottonsContainer.children("button").contains("Stay").click();

    return new CreatePostPage(this.cy);
  }

  clickLeaveButton() {
    this.$footerBottonsContainer.children("button").contains("Leave").click();
  }
}
