export class PostPublishedPage {
  constructor(cy) {
    if (!cy) {
      throw new Error("Es requerida la instancia de cypress");
    }
    this.cy = cy;
  }

  getDescriptionPusblished() {
    return this.cy.get("div.gh-post-bookmark-text");
  }

  getTitlePublishPage() {
    return this.cy.get(".gh-post-bookmark-title");
  }
  getTitlePage() {
    return this.cy.get("div[data-test-complete-title] span");
  }
}
