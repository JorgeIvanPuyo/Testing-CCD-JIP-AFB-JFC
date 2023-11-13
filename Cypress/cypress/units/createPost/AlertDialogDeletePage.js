import { CreatePostPage } from "./CreatePostPage";

export class AlertDialogDeletePage {
  $footerBottonsContainer = cy.get(".modal-footer");

  constructor(cy) {
    if (!cy) {
      throw new Error("Es requerida la instancia de cypress");
    }
    this.cy = cy;
  }

  clickStayButton() {
    this.$footerBottonsContainer.children("button").contains("Cancel").click();
    return new CreatePostPage(this.cy);
  }

  clickDeleteButton() {
    this.$footerBottonsContainer.children("button").contains("Delete").click();
    return new CreatePostPage(this.cy);
  }
}
