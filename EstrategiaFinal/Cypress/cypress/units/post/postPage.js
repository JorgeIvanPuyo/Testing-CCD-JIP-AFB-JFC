export class PostPage {
  constructor(cy) {
    if (!cy) {
      throw new Error("Es requerida la instancia de cypress");
    }
    this.cy = cy;
  }

  getTitle() {
    return this.cy.get("h1.gh-article-title");
  }

  getDescription() {
    return this.cy.get(".gh-content p");
  }

  getUrl() {
    return this.cy.url();
  }
}

export class PostPageV4 {
  constructor(cy) {
    if (!cy) {
      throw new Error("Es requerida la instancia de cypress");
    }
    this.cy = cy;
  }

  getTitle() {
    return this.cy.get("h1.gh-article-title");
  }

  getDescription() {
    return this.cy.get(".gh-content p");
  }

  getUrl() {
    return this.cy.url();
  }
}
