import { APP_PAGE, USER, PASSWORD } from "../const";
import { CreatePostPage } from "../units/createPost/CreatePostPage";
import { SigninPage } from "../units/login/SignInPage";

import { faker } from "@faker-js/faker";
import { PostPage } from "../units/post/postPage";

const TITLE_PUBLISH_PAGE = "Boom. It’s out there";

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
      // Then: el usuario habra publicado el nuevo post y podra verlo en el listado
      const postPublishedPage = posts.validatePostPublished();
      postPublishedPage.getTitlePage().should("contain", TITLE_PUBLISH_PAGE);
      postPublishedPage.getTitlePublishPage().should("contain", title);
      postPublishedPage
        .getDescriptionPusblished()
        .should("contain", description);

      // Nuevo post publicado screenshot;
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

      // Given: el usuario ha creado el post y publicado
      const postPage = new PostPage(cy);
      // When: el usuario haga click sobre el post publicado
      const slug = title.split(" ").join("-").toLowerCase();
      cy.visit(`${APP_PAGE}/${slug}`);
      // Then: el usuario podra ver el post publicado
      postPage.getTitle().should("contain", title);
      postPage.getDescription().should("contain", description);
      postPage.getUrl().should("contain", `/${slug}`);

      // Pagina del nuevo post screenshot;
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
    });
  });
});
