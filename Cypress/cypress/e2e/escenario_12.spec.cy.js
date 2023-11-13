import { APP_PAGE, USER, PASSWORD } from "../const";
import { CreatePostPage } from "../units/createPost/CreatePostPage";
import { SigninPage } from "../units/login/SignInPage";

import { faker } from "@faker-js/faker";
import { PostPage } from "../units/post/postPage";
import { DeletePostPage } from "../units/deletePost/DeletePostPage";

const TITLE_PUBLISH_PAGE = "Boom. It’s out there";
describe("Como usuario quiero eliminar un post en estado 'Draft' para borrar una publicación", function () {
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

        const post = new DeletePostPage(cy)
        post.navigateToPosts();
        cy.wait(1000);

        // Usar el nuevo método para seleccionar un post en estado 'Draft'
        post.getDraftPostToDelete().rightclick();

        // Continuar con la lógica para eliminar el post
        post.getDeleteButton().click();
        post.getDeleteConfirmationButton().click();

    });
});
});
