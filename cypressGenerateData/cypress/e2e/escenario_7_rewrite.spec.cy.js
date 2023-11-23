import { APP_PAGE, USER, PASSWORD } from "../const";
import { CreatePostPage } from "../units/createPost/CreatePostPage";
import { SigninPage } from "../units/login/SignInPage";

import { faker } from "@faker-js/faker";
import { PostsListPage } from "../units/postsList/PostsListPage";

describe("Como usuario quiero unpublish un post para no mostrar mas este contenido", function () {
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

      // Given: el usuario selecciona un post publicado de la lista
      const postListPage = homePage.goToPostsList();
      postListPage.scrollBotton();
      // When: el usuario valida el boton de editar
      const postPublished = postListPage.getPostPublished();
      console.log("postPublished: ", postPublished);
      // Then: el usuario podra ver el boton de editas deshabilidato

      postPublished
        .children("a")
        .children("h3")
        .invoke("text")
        .then((text) => {
          const trimText = text.trim();
          const postListPage2 = new PostsListPage(cy);
          const postSelected = postListPage2.getPostByTitle(trimText);
          const editPostPage = postListPage2.goToEditPostPublish(postSelected);

          const $updateButton = editPostPage.getUpdateButton();
          $updateButton.should("be.disabled");

          editPostPage.unpublishPost();
          cy.wait(1000);

          // uppublish post screenshot;
          cy.screenshot({
            capture: "viewport",
            scale: true,
          });

          const postListPage3 = editPostPage.goToPostsList();

          postListPage.scrollBotton();
          const postEdited = postListPage3.getPostByTitle(trimText);
          postListPage3.getStatusPost(postEdited).should("contain", "Draft");
        });
    });
  });
});
