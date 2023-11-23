export class CreateMemberPage {
  $inputName = cy.get(".gh-cp-member-email-name input[name='name']");
  $inputEmail = cy.get(".gh-cp-member-email-name input[name='email']");
  $saveButton;
  $retryButton;

  constructor(cy) {
    if (!cy) {
      throw new Error("Es requerida la instancia de cypress");
    }
    this.cy = cy;
  }

  getUrl() {
    return this.cy.url();
  }

  fillName(name) {
    this.$inputName.type(name);
  }

  fillEmail(email) {
    this.$inputEmail.type(email);
  }

  clickToSave() {
    if (!this.$saveButton) {
      this.$saveButton = cy.get("button[data-test-button='save']");
    }
    this.$saveButton.click();
  }

  getRetryButton() {
    if (!this.$retryButton) {
      this.$retryButton = cy.get(
        "button[data-test-button='save'] span[data-test-task-button-state='failure']"
      );
    }
    return this.$retryButton;
  }

  getEmailError() {
    const section = cy.get(
      ".gh-cp-member-email-name > :nth-child(2) .response"
    );

    return section;
  }
}
