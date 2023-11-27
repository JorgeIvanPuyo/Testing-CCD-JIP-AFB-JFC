import { faker } from "@faker-js/faker";
import { APP_PAGE, USER, PASSWORD } from "../const";
import { SigninPage } from "../units/login/SignInPage";
import { PostPage } from "../units/post/postPage";
import { getAprioriPostData, getPseudoRamdonData, getSlug } from "../utils";
import { TITLE_PUBLISH_PAGE } from "../../../Cypress/cypress/const";

describe("Como usuario quiero crear un nuevo post ingresando desde la opción Scheduled para mantener a mis usuarios actualizados", function () {
  it("e2e - datos aleatorios usando 'Faker' ", function () {
    cy.visit(`${APP_PAGE}/ghost/#/signin`);
    cy.wait(2000);

    cy.window().then((win) => {
      // Give: Usuario ingresa sus datos al login
      const signinPage = new SigninPage(cy);
      // When: Haga click sobre el boton de entrar
      const homePage = signinPage.loginValidUser(USER, PASSWORD);
      // Then: el usuario ingresa al dashboard
      homePage.getUrl().should("contain", "/dashboard");

      // Given: estando en el dashboard
      // When: El usuario hace click sobre la opcion para ver post agendados
      const postsScheduled = homePage.goToPostScheduled();
      // Then: el usuario estara en el listado de post agendados
      postsScheduled.getUrl().should("contain", "type=scheduled");

      // Given: estando en el listado de post agendados
      // When: El usuario ingresa a crear un nuevo post
      const posts = postsScheduled.goToCreatePost();
      // Then: el usuario estara en el formulario para crear un nuevo post
      posts.getUrl().should("contain", "/editor/post");


      // Given: datos aleatoreos para el post
      const title = faker.person.jobTitle();
      const description = faker.lorem.paragraph();

      // When: los datos son validados en los campos
      posts.fillPostTitle(title);
      posts.fillPostDescription(description);
      // When: El usuario hace click sobre publicar
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
      // When: El usuario hace click sobre la opcion para ver post agendados
      const postsScheduled = homePage.goToPostScheduled();
      // Then: el usuario estara en el listado de post agendados
      postsScheduled.getUrl().should("contain", "type=scheduled");

      // Given: estando en el listado de post agendados
      // When: El usuario ingresa a crear un nuevo post
      const posts = postsScheduled.goToCreatePost();
      // Then: el usuario estara en el formulario para crear un nuevo post
      posts.getUrl().should("contain", "/editor/post");


      // Given: datos pseudo aleatoreos para el post
      const {title, description} = await getPseudoRamdonData();

      // When: los datos son validados en los campos
      posts.fillPostTitle(title);
      posts.fillPostDescription(description);
      // When: El usuario hace click sobre publicar
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

    cy.window().then(async (win) => {
      // Give: Usuario ingresa sus datos al login
      const signinPage = new SigninPage(cy);
      // When: Haga click sobre el boton de entrar
      const homePage = signinPage.loginValidUser(USER, PASSWORD);
      // Then: el usuario ingresa al dashboard
      homePage.getUrl().should("contain", "/dashboard");

      // Given: estando en el dashboard
      // When: El usuario hace click sobre la opcion para ver post agendados
      const postsScheduled = homePage.goToPostScheduled();
      // Then: el usuario estara en el listado de post agendados
      postsScheduled.getUrl().should("contain", "type=scheduled");

      // Given: estando en el listado de post agendados
      // When: El usuario ingresa a crear un nuevo post
      const posts = postsScheduled.goToCreatePost();
      // Then: el usuario estara en el formulario para crear un nuevo post
      posts.getUrl().should("contain", "/editor/post");


      // Given: datos apriori para el post
      const {title, description} = getAprioriPostData(10);

      // When: los datos son validados en los campos
      posts.fillPostTitle(title);
      posts.fillPostDescription(description);
      // When: El usuario hace click sobre publicar
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
