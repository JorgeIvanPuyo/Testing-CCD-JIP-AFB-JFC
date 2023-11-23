import { CreateMemberPage } from "./CreateMemeber";

export class MembersPage {
  $anchorNewMemeber = cy.get("a[href='#/members/new/']");
  $list = cy.get("div[data-test-table='members']");

  constructor(cy) {
    if (!cy) {
      throw new Error("Es requerida la instancia de cypress");
    }
    this.cy = cy;
  }

  getUrl() {
    return this.cy.url();
  }

  goToCreateMember() {
    this.$anchorNewMemeber.click();

    return new CreateMemberPage(this.cy);
  }

  getMemeberItemByEmail(email) {
    return this.$list
      .children("table")
      .children("tbody")
      .children("tr")
      .children("a[data-test-table-data='details']")
      .children("div")
      .children("div")
      .contains("p", email)
      .parent("div")
      .parent("div")
      .parent("a");
  }
}
