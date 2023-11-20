import { APP_PAGE, USER, PASSWORD } from "../const";
import { SigninPage } from "../units/login/SignInPage";
import { ModifyPostPage } from "../units/modifyPost/ModifyPostPage";
import { faker } from "@faker-js/faker";


const TITLE_PUBLISH_PAGE = "Boom. It’s out there";
describe("Como usuario quiero eliminar un post en estado 'Draft' para borrar una publicación", function () {
    it("e2e", function () {
    cy.visit(`${APP_PAGE}/ghost/#/signin`);
    cy.wait(1000);

    cy.screenshot({
      capture: "viewport",
      scale: true,
    });

    cy.window().then((win) => {
      const signinPage = new SigninPage(cy);

      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

      const homePage = signinPage.loginValidUser(USER, PASSWORD);

      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

      homePage.getUrl().should("contain", "/dashboard");
      const date = '2023-11-05';
      const url = faker.lorem.word();
      const hours = "15:00";

      cy.wait(1000);

      const post = new ModifyPostPage(cy);
      post.navigateToPosts();
      
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

      post.getPublishedPostToModify().click();
      
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

      post.getSettingsButton().click();
      
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

      post.getPublisehModifyUrl().type(url + "{enter}", { force: true });
      post.getPublishedModifyDate().type(date, { force: true });
      post.getPublisehModifyHours().type(hours, { force: true });
      
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

      post.getPublishedViewPost().click();

      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

      post.navigateToPostModifies(url.toLowerCase());

      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

    });
});
});
