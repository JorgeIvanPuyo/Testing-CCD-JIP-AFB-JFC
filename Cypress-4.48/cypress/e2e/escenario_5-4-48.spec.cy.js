import { APP_PAGE, USER, PASSWORD } from "../const";
import { CreatePostPage } from "../units/createPost/CreatePostPage";
import { SigninPage } from "../units/login/SignInPage";

import { faker } from "@faker-js/faker";
import { PostPage } from "../units/post/postPage";

describe("Como usuario quiero crear y publicar post para tener a mis seguidores actualizados", function () {
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
      // When: el usuario ingresa los datos del nuevos post y sigue hasta su publicación
      const title = faker.person.jobTitle();
      const description = faker.lorem.paragraph();

      posts.fillPostTitle(title);
      posts.fillPostDescription(description);
      cy.wait(500);
      posts.clickPublishButton();
      cy.wait(500);
      posts.clickContinueAndReviewButton();
      posts.clickPublishPostRightNow();

      // Post publicado screenshot;
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
    });
  });
});
