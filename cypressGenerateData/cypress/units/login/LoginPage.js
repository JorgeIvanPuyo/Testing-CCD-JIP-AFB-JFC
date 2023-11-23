import { MembersPage } from "../members/MembersPage";
import { PostsListPage } from "../postsList/PostsListPage";

export class HomePage {
  $postsButton = cy.get("a[data-test-nav='posts']");
  $anchorMemebers = cy.get(".gh-nav-manage li a[href='#/members/']");

  constructor(cy) {
    if (!cy) {
      throw new Error("Es requerida la instancia de cypress");
    }
    this.cy = cy;
  }

  getUrl() {
    return this.cy.url();
  }

  goToPostsList() {
    this.$postsButton.click();

    return new PostsListPage(this.cy);
  }

  goToMembers() {
    this.$anchorMemebers.click();

    return new MembersPage(this.cy);
  }
}
