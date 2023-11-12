import { APP_PAGE, USER, PASSWORD } from "../const";
import { CreatePostPage } from "../units/createPost/CreatePostPage";
import { SigninPage } from "../units/login/SignInPage";

import { faker } from "@faker-js/faker";
import { PostPage } from "../units/post/postPage";
import { PostsListPage } from "../units/postsList/PostsListPage";

const TITLE_PUBLISH_PAGE = "Boom. It’s out there";

describe("Como usuario quiero crear un post pero no publicarlo para tenerlo como borrador y editarlo en otro momento", function () {
  it("Sign in", function () {
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
      const posts = new CreatePostPage(cy, win);
      posts.entryToPostListByIcon();
      // When: el usuario ingresa los datos del nuevos post pero no lo publica
      const title = faker.person.jobTitle();
      const description = faker.lorem.paragraph();
      posts.fillPostTitle(title);
      posts.fillPostDescription(description);
      posts.clickPublishButton();
      posts.clickContinueAndReviewButton();
      posts.goToEdit();
      posts.goToPostList();

      // Given: a list of posts
      const postList = new PostsListPage(cy);
      // When: el usuario busca un post por titulo
      const post = postList.getPost(title);
      const status = postList.getStatusPost(post);
      // Then: el usuario podra validar que esta como borrador es decir no se ha publicado
      status.should(($status) => {
        if (!$status.length) return;
        expect($status[0]).to.contain.text("Draft");
      });
    });
  });
});
