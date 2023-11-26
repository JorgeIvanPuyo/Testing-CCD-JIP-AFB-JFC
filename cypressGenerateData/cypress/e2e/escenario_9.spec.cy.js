import { APP_PAGE, USER, PASSWORD } from "../const";
import { SigninPage } from "../units/login/SignInPage";

import { faker } from "@faker-js/faker";
import { PostsListPage } from "../units/postsList/PostsListPage";
import { getAprioriPostData, getPseudoRamdonData } from "../utils";

describe("Como usuario quiero actualizar un post publicado para tener actualizada a mi audiencia", function () {
  it("e2e - datos aleatorios usando 'Faker' ", function () {
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
          // Then: La data del post es generada de forma aleatoria
          const newTitle = faker.lorem.words();
          const newDescription = faker.lorem.paragraph();
          // Then: el usuario podra editar el post
          const postListPage2 = new PostsListPage(cy);
          const postSelected = postListPage2.getPostByTitle(trimText);
          const editPostPage = postListPage2.goToEditPostPublish(postSelected);

          // Give: desde un posr editado sin actualizar
          editPostPage.fillPostTitle(newTitle);
          editPostPage.fillPostDescription(newDescription);
          // When: el usuario guarde sus cambios y regrese a el listado de post
          editPostPage.clickUpDateButton();
          const postsListPage3 = editPostPage.goToPostsList();
          // Then: el usuario podra ver el post actualizado
          postsListPage3.scrollBotton();
          postsListPage3.getPostByTitle(trimText + newTitle).should("exist");
        });
    });
  });

  it("e2e - datos pseudo aleatorios usando 'Mockaroo API' ", function () {
    cy.visit(`${APP_PAGE}/ghost/#/signin`);
    cy.wait(1000);

    cy.window().then((_) => {
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
        .then(async (text) => {
          const trimText = text.trim();
          // Then: La data del post es generada de forma pseudo aleatoria
          const { title: newTitle, description: newDescription } =
            await getPseudoRamdonData();
          // Then: el usuario podra editar el post
          const postListPage2 = new PostsListPage(cy);
          const postSelected = postListPage2.getPostByTitle(trimText);
          const editPostPage = postListPage2.goToEditPostPublish(postSelected);

          // Give: desde un posr editado sin actualizar
          editPostPage.fillPostTitle(newTitle);
          editPostPage.fillPostDescription(newDescription);
          // When: el usuario guarde sus cambios y regrese a el listado de post
          editPostPage.clickUpDateButton();
          const postsListPage3 = editPostPage.goToPostsList();
          // Then: el usuario podra ver el post actualizado
          postsListPage3.scrollBotton();
          postsListPage3.getPostByTitle(trimText + newTitle).should("exist");
        });
    });
  });

  it("e2e - datos a-priori usando 'Mockaroo JSON' ", function () {
    cy.visit(`${APP_PAGE}/ghost/#/signin`);
    cy.wait(1000);

    cy.window().then((_) => {
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
          // Then: La data del post es generada de forma apriori
          const { title: newTitle, description: newDescription } =
            getAprioriPostData(9);
          // Then: el usuario podra editar el post
          const postListPage2 = new PostsListPage(cy);
          const postSelected = postListPage2.getPostByTitle(trimText);
          const editPostPage = postListPage2.goToEditPostPublish(postSelected);

          // Give: desde un posr editado sin actualizar
          editPostPage.fillPostTitle(newTitle);
          editPostPage.fillPostDescription(newDescription);
          // When: el usuario guarde sus cambios y regrese a el listado de post
          editPostPage.clickUpDateButton();
          const postsListPage3 = editPostPage.goToPostsList();
          // Then: el usuario podra ver el post actualizado
          postsListPage3.scrollBotton();
          postsListPage3.getPostByTitle(trimText + newTitle).should("exist");
        });
    });
  });
});
