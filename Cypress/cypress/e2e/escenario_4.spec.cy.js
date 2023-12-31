import { APP_PAGE, USER, PASSWORD } from "../const";
import { CreatePostPage } from "../units/createPost/CreatePostPage";
import { SigninPage } from "../units/login/SignInPage";

import { faker } from "@faker-js/faker";
import { PostsListPage } from "../units/postsList/PostsListPage";

describe("Como usuario quiero editar un post que no este publicado para actualizarlo y tenerlo como borrador", function () {
  it("e2e", function () {
    cy.visit(`${APP_PAGE}/ghost/#/signin`);
    cy.wait(1000);

    cy.window().then((win) => {
      // Give: Usuario ingrese al login
      const signinPage = new SigninPage(cy);
      // When: digite sus datos y haga click sobre entrar
      const homePage = signinPage.loginValidUser(USER, PASSWORD);
      // Then: el usuario ingresa al dashboard
      homePage.getUrl().should("contain", "/dashboard");

      // Given: el usuario haga click sobre post y crear un nuevo post
      const posts = new CreatePostPage(cy);
      posts.entryToPostListByIcon();
      // When: el usuario ingresa los datos del nuevos post pero no lo publica
      const title = faker.person.jobTitle();
      const description = faker.lorem.paragraph();
      posts.fillPostTitle(title);
      posts.fillPostDescription(description);
      posts.clickPublishButton();

      // ventana para revizar el post screenshot;
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

      posts.clickContinueAndReviewButton();

      // Confirmar publicación;
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

      posts.goToEdit();
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

      // Given: Dada la lista de post
      const postList2 = new PostsListPage(cy);
      // When: el usuario busca un post por titulo
      const postToEdit = postList2.getPostByTitle(title);
      // Then: el usuario podra editar el post haciendo click sobre el icono de editar
      const postEditPage = postList2.goToEditPostUnpublish(postToEdit);

      // When: el usuario ingrese el nuevo titulo y descripción
      const newTitle = faker.person.jobTitle();
      const newDescription = faker.lorem.paragraph();
      postEditPage.fillPostTitle(newTitle);
      postEditPage.fillPostDescription(newDescription);
      // Then: el usuario regresa al listado de post y vera el post con el nuevo titulo, descripción y aun como borrador
      postEditPage.goToPostsList();
      const postList3 = new PostsListPage(cy);
      const postEdited = postList3.getPostByTitle(title + newTitle);
      const statusEdited = postList3.getStatusPost(postEdited);
      statusEdited.should(($status) => {
        if (!$status.length) return;
        expect($status[0]).to.contain.text("Draft");
      });
    });
  });
});
