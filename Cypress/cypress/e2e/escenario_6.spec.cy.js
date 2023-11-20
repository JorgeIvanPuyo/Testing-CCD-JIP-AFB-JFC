import { APP_PAGE, USER, PASSWORD } from "../const";
import { CreatePostPage } from "../units/createPost/CreatePostPage";
import { SigninPage } from "../units/login/SignInPage";

import { faker } from "@faker-js/faker";
import { PostPage } from "../units/post/postPage";
import { PostsListPage } from "../units/postsList/PostsListPage";

const TITLE_PUBLISH_PAGE = "Boom. It’s out there";

describe("Como usuario quiero ingresar a editar un post publicado pero sin modificarlo regresar al listado de post", function () {
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
      const postListPage = homePage.goToPostsList();

      // Given: el usuario selecciona un post publicado de la lista
      postListPage.scrollBotton();
      // When: el usuario valida el boton de editar
      const createPostPage = postListPage.selectAPostPublished();
      // Then: el usuario podra ver el boton de editas deshabilidato
      const $updateButton = createPostPage.getUpdateButton();
      $updateButton.should("be.disabled");

      // Boton desahabilitado screenshot;
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

      // Given: el usuario si no ha modificado nada del post
      // When: el usuario regresa al listado de posts
      const postsListPage2 = createPostPage.goToPostsList();
      // Then: el usuario podra ver el listo de posts y el post seleccionado sin modificar
    });
  });
});
