import { APP_PAGE, USER, PASSWORD } from "../const";
import { CreatePostPage } from "../units/createPost/CreatePostPage";
import { SigninPage } from "../units/login/SignInPage";

import { faker } from "@faker-js/faker";
import { PostPage } from "../units/post/postPage";
import { getAprioriPostData, getPseudoRamdonData, getSlug } from "../utils";

const TITLE_PUBLISH_PAGE = "Boom. It’s out there";

Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("ResizeObserver")) {
    return false;
  }
});

const escenaryDescription =
  "Como usuario quiero crear y publicar post para tener a mis seguidores actualizados";

describe(escenaryDescription, function () {
  it("e2e - datos aleatorios usando 'Faker' ", function () {
    cy.visit(`${APP_PAGE}/ghost/#/signin`);
    cy.wait(1000);

    cy.window().then((win) => {
      // Give: Usuario ingresa sus datos al login
      const signinPage = new SigninPage(cy);
      // When: Haga click sobre el boton de entrar
      const homePage = signinPage.loginValidUser(USER, PASSWORD);
      // Then: el usuario ingresa al dashboard
      homePage.getUrl().should("contain", "/dashboard");

      // Given: estando en el dashboard
      const posts = new CreatePostPage(cy);
      // When: El ususario ingresa a crear un nuevo post
      posts.entryToPostListByLabel();
      cy.wait(200);

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
      const slug = title.split(" ").join("-").toLowerCase();
      cy.visit(`${APP_PAGE}/${slug}`);
      // Then: el usuario podra ver el post publicado
      postPage.getTitle().should("contain", title);
      postPage.getDescription().should("contain", description);
      postPage.getUrl().should("contain", `/${slug}`);
    });
  });

  it("e2e - datos pseudo aleatorios usando 'Mockaroo API' ", function () {
    cy.visit(`${APP_PAGE}/ghost/#/signin`);
    cy.wait(1000);

    cy.window().then(async (win) => {
      // Give: Usuario ingresa sus datos al login
      const signinPage = new SigninPage(cy);
      // When: Haga click sobre el boton de entrar
      const homePage = signinPage.loginValidUser(USER, PASSWORD);
      // Then: el usuario ingresa al dashboard
      homePage.getUrl().should("contain", "/dashboard");

      // Given: estando en el dashboard
      const posts = new CreatePostPage(cy);
      // When: El ususario ingresa a crear un nuevo post
      posts.entryToPostListByLabel();
      cy.wait(200);

      // When: Se crean datos pseudo aleatoreos
      const { title, description } = await getPseudoRamdonData();

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
      cy.wait(200);
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

  it("e2e - datos a-priori usando 'Mockaroo JSON' ", function () {
    cy.visit(`${APP_PAGE}/ghost/#/signin`);
    cy.wait(1000);

    cy.window().then((win) => {
      // Give: Usuario ingresa sus datos al login
      const signinPage = new SigninPage(cy);
      // When: Haga click sobre el boton de entrar
      const homePage = signinPage.loginValidUser(USER, PASSWORD);
      // Then: el usuario ingresa al dashboard
      homePage.getUrl().should("contain", "/dashboard");

      // Given: estando en el dashboard
      const posts = new CreatePostPage(cy);
      // When: El ususario ingresa a crear un nuevo post
      posts.entryToPostListByLabel();
      cy.wait(200);

      // datos apriori
      const { title, description } = getAprioriPostData(0);

      // When: los datos son validados en los campos
      posts.fillPostTitle(title);
      posts.fillPostDescription(description);

      // Given: Los campos para crear un post ya llenos y validados
      // When: El usuario hace click sobre publicar
      posts.clickPublishButton();
      posts.clickContinueAndReviewButton();
      posts.clickPublishPostRightNow();
      // Then: el usuario habra publicado el nuevo post y podra verlo en el listado
      const postPublishedPage = posts.validatePostPublished();
      cy.wait(200);
      postPublishedPage.getTitlePage().should("contain", TITLE_PUBLISH_PAGE);
      cy.wait(200);
      postPublishedPage.getTitlePublishPage().should("contain", title);
      cy.wait(200);
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
