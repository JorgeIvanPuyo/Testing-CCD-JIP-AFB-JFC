import { APP_PAGE, USER, PASSWORD } from "../const";
import { CreatePostPage } from "../units/createPost/CreatePostPage";
import { SigninPage } from "../units/login/SignInPage";

import { faker } from "@faker-js/faker";
import { PostsListPage } from "../units/postsList/PostsListPage";
import { getAprioriPostData, getPseudoRamdonData } from "../utils";

describe("Como usuario quiero editar un post que no este publicado para actualizarlo y tenerlo como borrador", function () {
  it("e2e datos aleatorios usando 'Faker' ", function () {
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
      // When: el usuario ingresa los datos del nuevos post pero no lo publica
      const posts = new CreatePostPage(cy);
      // Then: el usuario estara en el formulario de crear in post
      posts.entryToPostListByIcon();

      // Given: los campos generados de forma aleatoria
      const title = faker.person.jobTitle();
      const description = faker.lorem.paragraph();

      // When: el usuario ingresa los datos del nuevos post
      posts.fillPostTitle(title);
      posts.fillPostDescription(description);
      // When: el usuario haga click sobre publicar pero en el ultimo paso nolo hace
      posts.clickPublishButton();
      cy.wait(1000);
      posts.clickContinueAndReviewButton();
      cy.wait(1000);
      posts.goToEdit();
      cy.wait(1000);
      // Then: el usuario podra ver el post sin publicar
      posts.goToPostsList();
      cy.wait(1000);

      // Given: a list of posts
      const postList = new PostsListPage(cy);
      // When: el usuario busca un post por titulo
      const post = postList.getPostByTitle(title);
      const status = postList.getStatusPost(post);
      // Then: el usuario podra validar que esta como borrador es decir no se ha publicado
      status.should(($status) => {
        if (!$status.length) return;
        expect($status[0]).to.contain.text("Draft");
      });
      cy.wait(1000);

      // Given: Dada la lista de post
      const postList2 = new PostsListPage(cy);
      // When: el usuario busca un post por titulo
      const postToEdit = postList2.getPostByTitle(title);
      // Then: el usuario podra editar el post haciendo click sobre el icono de editar
      cy.wait(500);
      const postEditPage = postList2.goToEditPostUnpublish(postToEdit);
      cy.wait(500);

      // When: el usuario ingrese el nuevo titulo y descripción
      const newTitle = faker.person.jobTitle();
      const newDescription = faker.lorem.paragraph();
      postEditPage.fillPostTitle(newTitle);
      postEditPage.fillPostDescription(newDescription);
      // Then: el usuario regresa al listado de post y vera el post con el nuevo titulo, descripción y aun como borrador
      postEditPage.goToPostsList();
      cy.wait(500);
      const postList3 = new PostsListPage(cy);
      const postEdited = postList3.getPostByTitle(title + newTitle);
      const statusEdited = postList3.getStatusPost(postEdited);
      cy.wait(500);
      statusEdited.should(($status) => {
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
      // When: el usuario ingresa los datos del nuevos post pero no lo publica
      const posts = new CreatePostPage(cy);
      // Then: el usuario estara en el formulario de crear in post
      posts.entryToPostListByIcon();

      // Given: los campos generados de forma pseudo aleatoria
      const { title, description } = await getPseudoRamdonData();
      // When: el usuario ingresa los datos del nuevos post
      posts.fillPostTitle(title);
      posts.fillPostDescription(description);
      // When: el usuario haga click sobre publicar pero en el ultimo paso nolo hace
      posts.clickPublishButton();
      cy.wait(1000);
      posts.clickContinueAndReviewButton();
      cy.wait(1000);
      posts.goToEdit();
      cy.wait(1000);
      // Then: el usuario podra ver el post sin publicar
      posts.goToPostsList();

      // Given: a list of posts
      const postList = new PostsListPage(cy);
      // When: el usuario busca un post por titulo
      const post = postList.getPostByTitle(title);
      const status = postList.getStatusPost(post);
      // Then: el usuario podra validar que esta como borrador es decir no se ha publicado
      status.should(($status) => {
        if (!$status.length) return;
        expect($status[0]).to.contain.text("Draft");
      });
      cy.wait(500);

      // Given: Dada la lista de post
      const postList2 = new PostsListPage(cy);
      // When: el usuario busca un post por titulo
      const postToEdit = postList2.getPostByTitle(title);
      // Then: el usuario podra editar el post haciendo click sobre el icono de editar
      const postEditPage = postList2.goToEditPostUnpublish(postToEdit);

      // When: el usuario ingrese el nuevo titulo y descripción
      const newTitle = faker.person.jobTitle();
      const newDescription = faker.lorem.paragraph();
      cy.wait(500);
      postEditPage.fillPostTitle(newTitle);
      postEditPage.fillPostDescription(newDescription);
      // Then: el usuario regresa al listado de post y vera el post con el nuevo titulo, descripción y aun como borrador
      postEditPage.goToPostsList();
      cy.wait(500);
      const postList3 = new PostsListPage(cy);
      const postEdited = postList3.getPostByTitle(title + newTitle);
      const statusEdited = postList3.getStatusPost(postEdited);
      cy.wait(500);
      statusEdited.should(($status) => {
        if (!$status.length) return;
        expect($status[0]).to.contain.text("Draft");
      });
      cy.wait(500);
    });
  });

  it("e2e - datos a-priori usando 'Mockaroo JSON' ", function () {
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
      // When: el usuario ingresa los datos del nuevos post pero no lo publica
      const posts = new CreatePostPage(cy);
      // Then: el usuario estara en el formulario de crear in post
      posts.entryToPostListByIcon();
      cy.wait(500);

      // Given: los campos generados de forma apriori
      const { title, description } = getAprioriPostData(0);
      // When: el usuario ingresa los datos del nuevos post
      posts.fillPostTitle(title);
      posts.fillPostDescription(description);
      // When: el usuario haga click sobre publicar pero en el ultimo paso nolo hace
      posts.clickPublishButton();
      cy.wait(1000);
      posts.clickContinueAndReviewButton();
      cy.wait(1000);
      posts.goToEdit();
      cy.wait(1000);
      // Then: el usuario podra ver el post sin publicar
      posts.goToPostsList();

      // Given: a list of posts
      const postList = new PostsListPage(cy);
      // When: el usuario busca un post por titulo
      const post = postList.getPostByTitle(title);
      const status = postList.getStatusPost(post);
      // Then: el usuario podra validar que esta como borrador es decir no se ha publicado
      cy.wait(500);
      status.should(($status) => {
        if (!$status.length) return;
        expect($status[0]).to.contain.text("Draft");
      });
      cy.wait(500);

      // Given: Dada la lista de post
      const postList2 = new PostsListPage(cy);
      // When: el usuario busca un post por titulo
      const postToEdit = postList2.getPostByTitle(title);
      // Then: el usuario podra editar el post haciendo click sobre el icono de editar
      const postEditPage = postList2.goToEditPostUnpublish(postToEdit);
      cy.wait(500);

      // When: el usuario ingrese el nuevo titulo y descripción
      const newTitle = faker.person.jobTitle();
      const newDescription = faker.lorem.paragraph();
      postEditPage.fillPostTitle(newTitle);
      postEditPage.fillPostDescription(newDescription);
      // Then: el usuario regresa al listado de post y vera el post con el nuevo titulo, descripción y aun como borrador
      postEditPage.goToPostsList();
      cy.wait(500);
      const postList3 = new PostsListPage(cy);
      const postEdited = postList3.getPostByTitle(title + newTitle);
      const statusEdited = postList3.getStatusPost(postEdited);
      cy.wait(500);
      statusEdited.should(($status) => {
        if (!$status.length) return;
        expect($status[0]).to.contain.text("Draft");
      });
    });
  });
});
