import { APP_PAGE, USER, PASSWORD } from "../const";
import { CreateMemberPage } from "../units/createMember/CreateMemberPage";
import { SigninPage } from "../units/login/SignInPage";

import { faker } from "@faker-js/faker";

describe("Como usuario quiero crear miembros para gestionar mi comunidad", function () {
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

      const members = new CreateMemberPage(cy);
      cy.wait(1000);
      members.navigateToMembers();

      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

      members.getNewMemberButton().click();
      const memberName = faker.person.fullName();
      const memberEmail = faker.internet.email();
      members.getMemberNameInput().type(memberName,{force: true});
      members.getMemberEmailInput().type(memberEmail,{force: true});

      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

      members.getSaveButton().click();

      // Continuar con las verificaciones necesarias para confirmar la creación del miembro
      // Por ejemplo, buscar el miembro en la lista de miembros, etc.

      cy.screenshot({
        capture: "viewport",
        scale: true,
      });

    }); 
  });
});
