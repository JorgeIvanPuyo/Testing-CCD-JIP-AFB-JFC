import { APP_PAGE, USER, PASSWORD } from "../const";
import { CreatePostPage } from "../units/createPost/CreatePostPage";
import { SigninPage } from "../units/login/SignInPage";

import { faker } from "@faker-js/faker";

Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("ResizeObserver")) {
    return false;
  }
});

const escenaryDescription =
  "Como usuario quiero crear y publicar post para tener a mis seguidores actualizados";

describe(escenaryDescription, function () {
  it("e2e", function () {
    cy.visit(`${APP_PAGE}/ghost/#/signin`);
    cy.wait(1000);

    cy.window().then((win) => {
      // Login screenshot;
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

      // Give: Usuario ingresa sus datos al login
      const signinPage = new SigninPage(cy);
      // When: Haga click sobre el boton de entrar
      const homePage = signinPage.loginValidUser(USER, PASSWORD);
      // Then: el usuario ingresa al dashboard
      homePage.getUrl().should("contain", "/dashboard");

      // Dashboard screenshot;
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

      // Given: estando en el dashboard
      const posts = new CreatePostPage(cy);
      // When: El ususario ingresa a crear un nuevo post
      posts.entryToPostListByLabel();

      // formulario de crear un post screenshot;
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

      // When: el usuario ingresa los datos del nuevos post y sigue hasta su publicación
      const title = faker.person.jobTitle();
      const description = faker.lorem.paragraph();
      posts.fillPostTitle(title);
      posts.fillPostDescription(description);
      posts.clickPublishButton();
      posts.clickContinueAndReviewButton();
      posts.clickPublishPostRightNow();
      // Then: el usuario habra publicado el nuevo post
      const postPublishedPage = posts.validatePostPublished();
      postPublishedPage.validatePublished().should("contain", "Published");

      // Nuevo post publicado screenshot;
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
    });
  });
});
