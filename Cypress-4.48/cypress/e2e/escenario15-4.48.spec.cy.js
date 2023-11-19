import { APP_PAGE, USER, PASSWORD } from "../const";
import { CreateMemberPage } from "../units/createMember/CreateMemberPage";
import { SigninPage } from "../units/login/SignInPage";

import { faker } from "@faker-js/faker";

describe("Como usuario quiero crear miembros para gestionar mi comunidad", function () {
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

      // Given: El usuario navega a la sección de miembros
      const members = new CreateMemberPage(cy);
      cy.wait(1000);
      members.navigateToMembers();
      // When: El usuario crea un nuevo miembro
      members.getNewMemberButton().click();
      const memberName = faker.person.fullName();
      const memberEmail = faker.internet.email();
      members.getMemberNameInput().type(memberName,{force: true});
      members.getMemberEmailInput().type(memberEmail,{force: true});
      members.getSaveButton().click();

      // Then: El usuario ha creado el miembro y puede verificar su existencia
      // Aquí puedes agregar las verificaciones necesarias para confirmar la creación del miembro
      // Por ejemplo, buscar el miembro en la lista de miembros, etc.
    }); 
  });
});