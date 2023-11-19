import { APP_PAGE, USER, PASSWORD } from "../const";
import { SigninPage } from "../units/login/SignInPage";
import { DeletePostPage } from "../units/deletePost/DeletePostPage";

const TITLE_PUBLISH_PAGE = "Boom. It’s out there";

describe("Como usuario quiero eliminar un post para borrar una publicación", function () {
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

      const post = new DeletePostPage(cy);

      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

      post.navigateToPosts();
      post.getPostToDelete().click();

      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

      cy.wait(300);
      post.getSettingsButton().click();

      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

      post.getDeleteButton().click();
      post.getDeleteConfirmationButton().click();

      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

      post.navigateToPosts();

      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
    });
  });
});
