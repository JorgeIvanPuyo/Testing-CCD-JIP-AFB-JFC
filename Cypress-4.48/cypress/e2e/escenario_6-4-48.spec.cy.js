import { APP_PAGE, USER, PASSWORD } from "../const";
import { CreatePostPage } from "../units/createPost/CreatePostPage";
import { SigninPage } from "../units/login/SignInPage";

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
      cy.wait(500);
      const postListPage = homePage.goToPostsList();
      cy.wait(500);

      // Given: el usuario selecciona un post publicado de la lista
      postListPage.scrollBotton();
      // When: el usuario valida el boton de editar
      const createPostPage = postListPage.selectAPostPublishedEdit();
      // Then: el usuario podra ver el boton de editas deshabilidato

      expect(createPostPage).to.be.false;

      // Boton desahabilitado screenshot;
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
    });
  });
});
