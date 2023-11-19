import { HomePage } from "./LoginPage";

export class SigninPage {
  constructor(cy) {
    if (!cy) {
      throw new Error("Es requerida la instancia de cypress");
    }
    this.cy = cy;
  }
 
  $email = cy.get('input[type="email"][name="identification"]'); 
  $password = cy.get('input[type="password"][name="password"]');
  $submitButton = cy.get("button[type=submit]");

  /**
   * Logs in a valid user.
   *
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @return {HomePage} - The new LoginPage object.
   */
  loginValidUser(username, password) {
    this.$email.type(username);
    this.$password.type(password);
    this.$submitButton.click();

    return new HomePage(this.cy);
  }
}
