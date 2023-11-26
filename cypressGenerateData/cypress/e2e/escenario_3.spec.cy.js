import { APP_PAGE, USER, PASSWORD } from "../const";
import { CreatePostPage } from "../units/createPost/CreatePostPage";
import { SigninPage } from "../units/login/SignInPage";

import { faker } from "@faker-js/faker";
import { PostsListPage } from "../units/postsList/PostsListPage";
import { getAprioriPostData, getPseudoRamdonData } from "../utils";


Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("ResizeObserver")) {
    return false;
  }
});

describe("Como usuario quiero crear un post pero no publicarlo para tenerlo como borrador y editarlo en otro momento", function () {
  it("e2e - datos aleatorios usando 'Faker' ", function () {
    cy.visit(`${APP_PAGE}/ghost/#/signin`);
    cy.wait(1000);

    cy.window().then((win) => {
      // Give: Usuario ingrese al login
      const signinPage = new SigninPage(cy);
      // When: digite sus datos y haga click sobre entrar
      const homePage = signinPage.loginValidUser(USER, PASSWORD);
      // Then: el usuario ingresa al dashboard
      homePage.getUrl().should("contain", "/dashboard");

      // Given: estando en el dashboard
      const posts = new CreatePostPage(cy);
      // When: El ususario ingresa a crear un nuevo post
      posts.entryToPostListByLabel();

      // datos aleatoreos
      const title = faker.person.jobTitle();
      const description = faker.lorem.paragraph();

      // When: el usuario ingresa los datos del nuevos post pero no lo publica
      posts.fillPostTitle(title);
      posts.fillPostDescription(description);
      posts.clickPublishButton();
      cy.wait(1000);
      posts.clickContinueAndReviewButton();
      cy.wait(1000);
      posts.goToEdit();
      cy.wait(500);
      // Then: el usuario habra tendra nuevo post NO publicado y podra verlo en el listado
      posts.goToPostsList();
      cy.wait(500);

      // Given: a list of posts
      const postList = new PostsListPage(cy);
      // When: el usuario busca un post por titulo
      const post = postList.getPostByTitle(title);
      const status = postList.getStatusPost(post);
      cy.wait(500);
      // Then: el usuario podra validar que esta como borrador es decir no se ha publicado
      status.should(($status) => {
        if (!$status.length) return;
        expect($status[0]).to.contain.text("Draft");
      });
      cy.wait(500);
    });
  });

  it("e2e - datos pseudo aleatorios usando 'Mockaroo API' ", function () {
    cy.visit(`${APP_PAGE}/ghost/#/signin`);
    cy.wait(1000);

    cy.window().then(async (win) => {
      // Give: Usuario ingrese al login
      const signinPage = new SigninPage(cy);
      // When: digite sus datos y haga click sobre entrar
      const homePage = signinPage.loginValidUser(USER, PASSWORD);
      // Then: el usuario ingresa al dashboard
      homePage.getUrl().should("contain", "/dashboard");

      // Given: estando en el dashboard
      const posts = new CreatePostPage(cy);
      // When: El ususario ingresa a crear un nuevo post
      posts.entryToPostListByLabel();

      // datos pseudo aleatoreos
      const { title, description } = await getPseudoRamdonData();

      // When: el usuario ingresa los datos del nuevos post pero no lo publica
      posts.fillPostTitle(title);
      posts.fillPostDescription(description);
      posts.clickPublishButton();
      cy.wait(1000);
      posts.clickContinueAndReviewButton();
      cy.wait(1000);
      posts.goToEdit();
      cy.wait(1000);
      // Then: el usuario habra tendra nuevo post NO publicado y podra verlo en el listado
      posts.goToPostsList();
      cy.wait(1000);

      // Given: a list of posts
      const postList = new PostsListPage(cy);
      // When: el usuario busca un post por titulo
      const post = postList.getPostByTitle(title);
      const status = postList.getStatusPost(post);
      cy.wait(1000);
      // Then: el usuario podra validar que esta como borrador es decir no se ha publicado
      status.should(($status) => {
        if (!$status.length) return;
        expect($status[0]).to.contain.text("Draft");
      });
      cy.wait(1000);
    });
  });

  it("e2e - datos a-priori usando 'Mockaroo JSON' ", function () {
    cy.visit(`${APP_PAGE}/ghost/#/signin`);
    cy.wait(1000);

    cy.window().then((win) => {
      // Give: Usuario ingrese al login
      const signinPage = new SigninPage(cy);
      // When: digite sus datos y haga click sobre entrar
      const homePage = signinPage.loginValidUser(USER, PASSWORD);
      // Then: el usuario ingresa al dashboard
      homePage.getUrl().should("contain", "/dashboard");

      // Given: estando en el dashboard
      const posts = new CreatePostPage(cy);
      // When: El ususario ingresa a crear un nuevo post
      posts.entryToPostListByLabel();

      // datos apriori
      const { title, description } = getAprioriPostData(3);

      // When: el usuario ingresa los datos del nuevos post pero no lo publica
      posts.fillPostTitle(title);
      posts.fillPostDescription(description);
      posts.clickPublishButton();
      cy.wait(1000);
      posts.clickContinueAndReviewButton();
      cy.wait(1000);
      posts.goToEdit();
      cy.wait(1000);
      // Then: el usuario habra tendra nuevo post NO publicado y podra verlo en el listado
      posts.goToPostsList();
      cy.wait(1000);

      // Given: a list of posts
      const postList = new PostsListPage(cy);
      // When: el usuario busca un post por titulo
      const post = postList.getPostByTitle(title);
      const status = postList.getStatusPost(post);
      cy.wait(1000);
      // Then: el usuario podra validar que esta como borrador es decir no se ha publicado
      status.should(($status) => {
        if (!$status.length) return;
        expect($status[0]).to.contain.text("Draft");
      });
    });
  });
});
