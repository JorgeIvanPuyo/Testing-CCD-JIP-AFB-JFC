import { APP_PAGE, USER, PASSWORD } from "../const";
import { SigninPage } from "../units/login/SignInPage";
import { ModifyPostPage } from "../units/modifyPost/ModifyPostPage";
import { faker } from "@faker-js/faker";


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
    const date= '2023-11-05';
    const  url= faker.lorem.word();
    const hours = "15:00";
    cy.wait(1000);
        const post = new ModifyPostPage(cy);
        post.navigateToPosts();
        post.getPublishedPostToModify().click();
        post.getSettingsButton().click();
        post.getPublisehModifyUrl().type(url+"{enter}",{force: true});
        post.getPublishedModifyDate().type(date,{force: true});
        post.getPublisehModifyHours().type(hours,{force: true});
        post.getPublishedViewPost().click();

        post.navigateToPostModifies(url.toLowerCase());



    });
});
});
