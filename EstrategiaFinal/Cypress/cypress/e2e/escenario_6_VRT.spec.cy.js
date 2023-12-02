import { APP_PAGE, USER, PASSWORD, APP_PAGE_V4 } from "../const";
import { SigninPage, SigninPageV4 } from "../units/login/SignInPage";
import { PostPage } from "../units/post/postPage";

import { getSlug } from "../utils";

const TITLE_PUBLISH_PAGE = "Boom. It’s out there";

Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("ResizeObserver")) {
    return false;
  }
});

describe("Como usuario quiero crear y publicar post desde el listado para tener a mis seguidores actualizados, Version 5 de Ghost", function () {
  it("VRT - Ghost Version 5.7.2 ", function () {
    cy.visit(`${APP_PAGE}/ghost/#/signin`);
    cy.wait(2000);

    // Take screenshot
    cy.screenshot("Login-V5", {
      overwrite: true,
    });

    cy.window().then((win) => {
      // Give: La pagina de login
      const signinPage = new SigninPage(cy);
      // When: digite sus datos y haga click sobre entrar
      const homePage = signinPage.loginValidUser(USER, PASSWORD);
      // Then: el usuario ingresa al dashboard
      homePage.getUrl().should("contain", "/dashboard");

      // Take screenshot
      cy.screenshot("Dashboard-V5", {
        overwrite: true,
      });

      // Given: El usuario se encuentra en el dashboard
      // When: El ususario clickea sobre el boton de lista de posts
      const postsListPage = homePage.goToPostsList();
      cy.wait(500);
      // Then: La url debe ser validada
      postsListPage.getUrl().should("contain", "/posts");
      cy.screenshot("postsList-V5", {
        overwrite: true,
      });

      // Given la lista de usuarios
      // When: El usuario clickea sobre el boton de crear un post
      const CreatePostPage = postsListPage.goToCreatePost();
      cy.wait(500);
      // Then: La url debe ser validada
      CreatePostPage.getUrl().should("contain", "/editor/post");
      cy.screenshot("createPostPage-V5", {
        overwrite: true,
      });

      // Given: datos aleatoreos para generar el post
      const title = "Titulo para un post";
      const description =
        "Descripcion para un post, debe ser igual entre las dos versiones para validar tipografia";
      // When: los datos son ingresados en los campos de titulo y descripcion
      CreatePostPage.fillPostTitle(title);
      CreatePostPage.fillPostDescription(description);
      cy.screenshot("FormFilled-V5", {
        overwrite: true,
      });
      // When: El usuario hace click sobre publicar
      CreatePostPage.clickPublishButton();
      cy.wait(400);

      cy.screenshot("createPost-V5", {
        overwrite: true,
      });

      CreatePostPage.clickContinueAndReviewButton();
      cy.wait(400);
      CreatePostPage.clickPublishPostRightNow();
      cy.wait(400);
      cy.screenshot("postPublished-V5", {
        overwrite: true,
      });
      // Then: el usuario habra publicado el nuevo post y podra verlo en el listado
      const postPublishedPage = CreatePostPage.validatePostPublished();
      postPublishedPage.getTitlePage().should("contain", TITLE_PUBLISH_PAGE);
      postPublishedPage.getTitlePublishPage().should("contain", title);
      postPublishedPage
        .getDescriptionPusblished()
        .should("contain", description);

      cy.screenshot("detailPostPublished-V5", {
        overwrite: true,
      });

      // Given: el usuario ha creado el post y publicado
      const postPage = new PostPage(cy);
      // When: el usuario haga click sobre el post publicado
      const slug = getSlug(title);
      cy.visit(`${APP_PAGE}/${slug}`);
      cy.wait(500);
      cy.screenshot("postPage-V5", {
        overwrite: true,
      });
      // Then: el usuario podra ver el post publicado

      postPage.getTitle().should("contain", title);
      postPage.getDescription().should("contain", description);
      postPage.getUrl().should("contain", `/${slug}`);
    });
  });

  it("VRT - Ghost Version 4.4.7 ", function () {
    cy.visit(`${APP_PAGE_V4}/ghost/#/signin`);
    cy.wait(2000);

    // Take screenshot
    cy.screenshot("Login-V4", {
      overwrite: true,
    });

    cy.window().then((win) => {
      // Give: La pagina de login
      const signinPage = new SigninPageV4(cy);
      // When: digite sus datos y haga click sobre entrar
      const homePage = signinPage.loginValidUser(USER, PASSWORD);
      // Then: el usuario ingresa al dashboard
      homePage.getUrl().should("contain", "/dashboard");

      // Take screenshot
      cy.screenshot("Dashboard-V4", {
        overwrite: true,
      });

      // Given: El usuario se encuentra en el dashboard
      // When: El ususario clickea sobre el boton de lista de posts
      const postsListPage = homePage.goToPostsList();
      cy.wait(500);
      // Then: La url debe ser validada
      postsListPage.getUrl().should("contain", "/posts");
      cy.screenshot("postsList-V4", {
        overwrite: true,
      });

      // Given la lista de usuarios
      // When: El usuario clickea sobre el boton de crear un post
      const CreatePostPage = postsListPage.goToCreatePost();
      cy.wait(500);
      // Then: La url debe ser validada
      CreatePostPage.getUrl().should("contain", "/editor/post");
      cy.screenshot("createPostPage-V4", {
        overwrite: true,
      });

      // Given: datos aleatoreos para generar el post
      const title = "Titulo para un post";
      const description =
        "Descripcion para un post, debe ser igual entre las dos versiones para validar tipografia";
      // When: los datos son ingresados en los campos de titulo y descripcion
      CreatePostPage.fillPostTitle(title);
      CreatePostPage.fillPostDescription(description);
      cy.screenshot("FormFilled-V4", {
        overwrite: true,
      });
      // When: El usuario hace click sobre publicar
      CreatePostPage.clickPublishButton();
      cy.wait(400);
      cy.screenshot("createPost-V4", {
        overwrite: true,
      });
      CreatePostPage.clickContinueAndReviewButton();
      cy.wait(400);
      CreatePostPage.clickPublishPostRightNow();
      cy.wait(400);
      cy.screenshot("postPublished-V4", {
        overwrite: true,
      });

      // // Then: el usuario habra publicado el nuevo post y podra verlo en el listado
      // const postPublishedPage = posts.validatePostPublished();
      // postPublishedPage.getTitlePage().should("contain", TITLE_PUBLISH_PAGE);
      // postPublishedPage.getTitlePublishPage().should("contain", title);
      // postPublishedPage
      //   .getDescriptionPusblished()
      //   .should("contain", description);

      // // Given: el usuario ha creado el post y publicado
      // const postPage = new PostPage(cy);
      // // When: el usuario haga click sobre el post publicado
      // const slug = getSlug(title);
      // cy.visit(`${APP_PAGE}/${slug}`);
      // // Then: el usuario podra ver el post publicado
      // postPage.getTitle().should("contain", title);
      // postPage.getDescription().should("contain", description);
      // postPage.getUrl().should("contain", `/${slug}`);
    });
  });
});
