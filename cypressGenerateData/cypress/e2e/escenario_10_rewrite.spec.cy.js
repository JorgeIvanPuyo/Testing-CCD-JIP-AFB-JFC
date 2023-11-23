import { APP_PAGE, USER, PASSWORD } from "../const";
import { SigninPage } from "../units/login/SignInPage";
import { PostsListPage } from "../units/postsList/PostsListPage";

describe("Como usuario quiero intentar eliminar un post pero no hacerlo para validar el mensaje de confirmación de eliminación de un post", function () {
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
          // Then: el usuario podra ver el listo de posts
          const postListPage2 = new PostsListPage(cy);
          const postSelected = postListPage2.getPostByTitle(trimText);
          const editPostPage = postListPage2.goToEditPostPublish(postSelected);

          // Give: Desde la pagina de edicion de post el usuario abre las configuraciones
          const settingsPage = editPostPage.openSettings();
          // When: el usuario intenta eliminar el post
          const dialogDeletePage = settingsPage.clickDeletePost();
          // Then: una alerta de confirmación aparece y el usuario decide no eliminar el post
          const editPostPage2 = dialogDeletePage.clickStayButton();

          // When: el usuario regresa a el listado de post
          const postsListPage3 = editPostPage2.goToPostsList();
          // Then: el usuario podra ver el post sin haber sido borrado
          postsListPage3.scrollBotton();
          postsListPage3.getPostByTitle(trimText).should("exist");
        });
    });
  });
});
