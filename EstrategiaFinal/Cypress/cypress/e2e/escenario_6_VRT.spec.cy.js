import { APP_PAGE, USER, PASSWORD, APP_PAGE_V4 } from "../const";
import { CreatePostPage } from "../units/createPost/CreatePostPage";
import { SigninPage } from "../units/login/SignInPage";

import { faker } from "@faker-js/faker";
import { PostsListPage } from "../units/postsList/PostsListPage";

Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("ResizeObserver")) {
    return false;
  }
});

describe("Como usuario quiero crear y publicar post desde el listado para tener a mis seguidores actualizados, Version 5 de Ghost", function () {
  it("VRT - Ghost Version 5.7.2 ", function () {
    cy.visit(`${APP_PAGE}/ghost/#/signin`);
    cy.wait(2000);

    cy.window().then((win) => {
      // Give: La pagina de login
      const signinPage = new SigninPage(cy);
      // When: digite sus datos y haga click sobre entrar
      const homePage = signinPage.loginValidUser(USER, PASSWORD);
      // Then: el usuario ingresa al dashboard
      homePage.getUrl().should("contain", "/dashboard");

      // Given: El usuario se encuentra en el dashboard
      const posts = new CreatePostPage(cy);
      // When: El ususario ingresa a crear un nuevo post
      posts.entryToPostListByIcon();

      // datos aleatoreos
      const title = faker.person.jobTitle();
      const description = faker.lorem.paragraph();

      // When: los datos son validados en los campos
      posts.fillPostTitle(title);
      posts.fillPostDescription(description);
      // When: El usuario hace click sobre publicar
      posts.clickPublishButton();
      cy.wait(200);
      posts.clickContinueAndReviewButton();
      cy.wait(200);
      posts.clickPublishPostRightNow();
      cy.wait(200);
      // Then: el usuario habra publicado el nuevo post y podra verlo en el listado
      const postPublishedPage = posts.validatePostPublished();
      postPublishedPage.getTitlePage().should("contain", TITLE_PUBLISH_PAGE);
      postPublishedPage.getTitlePublishPage().should("contain", title);
      postPublishedPage
        .getDescriptionPusblished()
        .should("contain", description);

      // Given: el usuario ha creado el post y publicado
      const postPage = new PostPage(cy);
      // When: el usuario haga click sobre el post publicado
      const slug = getSlug(title);
      cy.visit(`${APP_PAGE}/${slug}`);
      // Then: el usuario podra ver el post publicado
      postPage.getTitle().should("contain", title);
      postPage.getDescription().should("contain", description);
      postPage.getUrl().should("contain", `/${slug}`);
    });
  });

  it("VRT - Ghost Version 4.4.7 ", function () {
    cy.visit(`${APP_PAGE_V4}/ghost/#/signin`);
    cy.wait(2000);

    cy.window().then((win) => {
      // Give: La pagina de login
      const signinPage = new SigninPage(cy);
      // When: digite sus datos y haga click sobre entrar
      const homePage = signinPage.loginValidUser(USER, PASSWORD);
      // Then: el usuario ingresa al dashboard
      homePage.getUrl().should("contain", "/dashboard");

      // Given: El usuario se encuentra en el dashboard
      const posts = new CreatePostPage(cy);
      // When: El ususario ingresa a crear un nuevo post
      posts.entryToPostListByIcon();

      // datos aleatoreos
      const title = faker.person.jobTitle();
      const description = faker.lorem.paragraph();

      // When: los datos son validados en los campos
      posts.fillPostTitle(title);
      posts.fillPostDescription(description);
      // When: El usuario hace click sobre publicar
      posts.clickPublishButton();
      cy.wait(200);
      posts.clickContinueAndReviewButton();
      cy.wait(200);
      posts.clickPublishPostRightNow();
      cy.wait(200);
      // Then: el usuario habra publicado el nuevo post y podra verlo en el listado
      const postPublishedPage = posts.validatePostPublished();
      postPublishedPage.getTitlePage().should("contain", TITLE_PUBLISH_PAGE);
      postPublishedPage.getTitlePublishPage().should("contain", title);
      postPublishedPage
        .getDescriptionPusblished()
        .should("contain", description);

      // Given: el usuario ha creado el post y publicado
      const postPage = new PostPage(cy);
      // When: el usuario haga click sobre el post publicado
      const slug = getSlug(title);
      cy.visit(`${APP_PAGE}/${slug}`);
      // Then: el usuario podra ver el post publicado
      postPage.getTitle().should("contain", title);
      postPage.getDescription().should("contain", description);
      postPage.getUrl().should("contain", `/${slug}`);
    });
  });
});
