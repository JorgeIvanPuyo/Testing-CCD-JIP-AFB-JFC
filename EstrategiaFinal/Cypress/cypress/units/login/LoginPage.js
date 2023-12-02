import { MembersPage } from "../members/MembersPage";
import { PostsListPage } from "../postsList/PostsListPage";
import { SchedulePage } from "../scheduled/SchedulePage";

export class HomePage {
  $postsButton = cy.get("a[data-test-nav='posts']");
  $anchorMemebers = cy.get(".gh-nav-manage li a[href='#/members/']");
  $scheduledButton = cy.get("a[data-test-nav-custom='posts-Scheduled']");

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

  goToPostScheduled(){
    this.$scheduledButton.click();

    return new SchedulePage(this.cy);
  }

}
