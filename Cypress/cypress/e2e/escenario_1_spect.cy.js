import { LOGIN_PAGE, USER, PASSWORD } from "../const";
import { SigninPage } from "../units/login/SignInPage";

describe("Como usuario quiero crear y publicar post para tener a mis seguidores actualizados", function () {
  it("Sign in", function () {
    cy.visit(LOGIN_PAGE);
    cy.wait(1000);

    cy.window().then((win) => {
      // Give
      const signinPage = new SigninPage(cy);
      // When
      const homePage = signinPage.loginValidUser(USER, PASSWORD);
      // Then
      homePage.getUrl().should("contain", "/dashboard");
    });
  });
  it("Sign in", function () {
    cy.visit(LOGIN_PAGE);
    cy.wait(1000);

    cy.window().then((win) => {
      // Give
      const signinPage = new SigninPage(cy);
      // When
      const homePage = signinPage.loginValidUser(USER, PASSWORD);
      // Then
      homePage.getUrl().should("contain", "/dashboard");
    });
  });
});
