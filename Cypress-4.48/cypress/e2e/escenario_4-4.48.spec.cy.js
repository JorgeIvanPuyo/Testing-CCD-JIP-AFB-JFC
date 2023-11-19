import { APP_PAGE, USER, PASSWORD } from "../const";
import { CreatePostPage } from "../units/createPost/CreatePostPage";
import { SigninPage } from "../units/login/SignInPage";

import { faker } from "@faker-js/faker";
import { PostPage } from "../units/post/postPage";

const TITLE_PUBLISH_PAGE = "Boom. It’s out there";

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
      posts.clickPublishButton();
      posts.clickContinueAndReviewButton();
      posts.clickPublishPostRightNow();

      // Post publicado screenshot;
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

      // Then: el usuario habra publicado el nuevo post y podra verlo en el listado
      const postPublishedPage = posts.validatePostPublished();
      postPublishedPage.getTitlePage().should("contain", TITLE_PUBLISH_PAGE);
      postPublishedPage.getTitlePublishPage().should("contain", title);
      postPublishedPage
        .getDescriptionPusblished()
        .should("contain", description);

      // Given: el usuario ha creado el post y publicado
      const postPage = new PostPage(cy);
      // When: el usuario haga click sobre el post publicado
      const slug = title.split(" ").join("-").toLowerCase();
      cy.visit(`${APP_PAGE}/${slug}`);
      // Then: el usuario podra ver el post publicado
      postPage.getTitle().should("contain", title);
      postPage.getDescription().should("contain", description);
      postPage.getUrl().should("contain", `/${slug}`);
    });
  });
});
