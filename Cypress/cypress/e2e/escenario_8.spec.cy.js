import { APP_PAGE, USER, PASSWORD } from "../const";
import { CreatePostPage } from "../units/createPost/CreatePostPage";
import { SigninPage } from "../units/login/SignInPage";

import { faker } from "@faker-js/faker";
import { PostPage } from "../units/post/postPage";
import { PostsListPage } from "../units/postsList/PostsListPage";

const TITLE_PUBLISH_PAGE = "Boom. It’s out there";

describe("Como usuario quiero actualizar un post publicado para tener actualizada a mi audiencia", function () {
  it("intentar salir de la edicion del post por error para validar el aviso de confirmación de cambios", function () {
    cy.visit(`${APP_PAGE}/ghost/#/signin`);
    cy.wait(1000);

    cy.window().then((win) => {
      // Give: Usuario ingrese al login
      const signinPage = new SigninPage(cy);
      // When: digite sus datos y haga click sobre entrar
      const homePage = signinPage.loginValidUser(USER, PASSWORD);
      // Then: el usuario ingresa al dashboard
      homePage.getUrl().should("contain", "/dashboard");

      // Given: el usuario esta en el dashboard
      // When: el usuario hace click sobre ver el listado de post
      const postListPage = homePage.goToPostsList();
      // Then: el usuario podra ver el listo de posts
      postListPage.scrollBotton();

      // Given: una lista de post
      const postPublished = postListPage.getPostPublished();
      // When: el usuario selecciona un post publicado
      postPublished
        .children("a")
        .children("h3")
        .invoke("text")
        .then((text) => {
          const trimText = text.trim();
          const newTitle = faker.lorem.words();
          const newTitleAux = faker.lorem.words();
          const newDescription = faker.lorem.paragraph();
          const newDescriptionAux = faker.lorem.paragraph();
          // Then: el usuario podra editar el post
          const postListPage2 = new PostsListPage(cy);
          const postSelected = postListPage2.getPostByTitle(trimText);
          const editPostPage = postListPage2.goToEditPostPublish(postSelected);

          // Give: desde un posr editado sin actualizar
          editPostPage.fillPostTitle(newTitle);
          editPostPage.fillPostDescription(newDescription);
          // When: el usuario intenta volver al listado de posta sin haber guardado cambios
          const alertDialogPage = editPostPage.goToPostsListWithOutSave();
          // Then: el usuario podra ver el aviso de confirmación de cambios y permanecer editando el post post
          const editPostPage2 = alertDialogPage.clickStayButton();

          // Give: un post en edicion con cambios
          editPostPage2.fillPostTitle(newTitleAux);
          editPostPage2.fillPostDescription(newDescriptionAux);
          // when: el usuario actualiza el post y va hacia el listado de post
          editPostPage2.getUpdateButton().click();
          const postsListPage3 = editPostPage2.goToPostsList();
          // Then: el usuario podra ver el post actualizado
          postsListPage3.scrollBotton();
          postsListPage3
            .getPostByTitle(trimText + newTitle + newTitleAux)
            .should("exist");
        });
    });
  });
});
