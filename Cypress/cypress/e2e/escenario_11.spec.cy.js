import { APP_PAGE, USER, PASSWORD } from "../const";
import { CreatePostPage } from "../units/createPost/CreatePostPage";
import { SigninPage } from "../units/login/SignInPage";

import { faker } from "@faker-js/faker";
import { PostPage } from "../units/post/postPage";
import { DeletePostPage } from "../units/deletePost/DeletePostPage";

const TITLE_PUBLISH_PAGE = "Boom. It’s out there";

describe("Como usuario quiero eliminar un post para borrar una publicacion", function () {
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

    //Given El usuario haga click sobre Posts
     const post = new DeletePostPage(cy)
     post.navigateToPosts();
         //When el usuario haga click derecho sobre un Post a eliminar
    cy.wait(1000);
    post.getPostToDelete().rightclick();

    post.getDeleteButton().click();
    post.getDeleteConfirmationButton().click();
    //Then: el usuario habra borrado el primer post
    });


});
});
