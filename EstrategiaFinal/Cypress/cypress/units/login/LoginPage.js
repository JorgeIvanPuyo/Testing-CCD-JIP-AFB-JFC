import { MembersPage } from "../members/MembersPage";
import { PostsListPage, PostsListPageV4 } from "../postsList/PostsListPage";
import { SchedulePage } from "../scheduled/SchedulePage";

export class HomePage {
  $postsButton;
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
    if (!this.$postsButton) {
      this.$postsButton = cy.get("a[data-test-nav='posts']");
    }
    this.$postsButton.click();

    return new PostsListPage(this.cy);
  }

  goToMembers() {
    this.$anchorMemebers.click();

    return new MembersPage(this.cy);
  }

  goToPostScheduled() {
    this.$scheduledButton.click();

    return new SchedulePage(this.cy);
  }
}

export class HomePageV4 {
  $postsButton;

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
    if (!this.$postsButton) {
      this.$postsButton = cy.get('.gh-nav-list-new a[href="#/posts/"]');
    }
    this.$postsButton.click();

    return new PostsListPageV4(this.cy);
  }
}
