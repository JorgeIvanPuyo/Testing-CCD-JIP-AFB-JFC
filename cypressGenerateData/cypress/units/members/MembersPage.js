import { CreateMemberPage } from "./CreateMemeber";

export class MemberPage {
  $anchorNewMemeber = cy.get("a[href='#/members/new/']");

  constructor(cy) {
    if (!cy) {
      throw new Error("Es requerida la instancia de cypress");
    }
    this.cy = cy;
  }

  goToCreateMember() {
    this.$anchorNewMemeber.click();

    return new CreateMemberPage(this.cy);
  }

  getUrl() {
    return this.cy.url();
  }
}
