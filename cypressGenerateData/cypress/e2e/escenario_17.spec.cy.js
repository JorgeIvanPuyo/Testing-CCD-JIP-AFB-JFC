import { APP_PAGE, USER, PASSWORD } from "../const";
import { CreateMemberPage } from "../units/createMember/CreateMemberPage";
import { SigninPage } from "../units/login/SignInPage";

import { faker } from "@faker-js/faker";

describe("Como usuario quiero crear miembros para gestionar mi comunidad", function () {
  it("Añadir un nuevo miembro con éxito e2e - datos aleatorios usando 'Faker'", function () {
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
      const membersPage = new CreateMemberPage(cy);
      cy.wait(1000);
      membersPage.navigateToMembers();

      // When: El usuario crea un nuevo miembro
      membersPage.getNewMemberButton().click();
      const memberName = faker.person.fullName();
      membersPage.getMemberNameInput().type(memberName);
      cy.screenshot("New Member Page"); // Captura de pantalla

      // And El usuario completa el campo 'labels' con etiquetas relevantes
      const labels = 'Etiqueta1'; // Ejemplo de etiquetas
      membersPage.getEmberPowerSelectInput().type(`${labels}{enter}`);
      cy.screenshot("New Member Labels"); // Captura de pantalla

      // And El usuario completa el campo 'note' con una nota relevante
      const note = faker.lorem.sentence();
      membersPage.getMemberNoteTextarea().type(note);
      cy.screenshot("New Member Note"); // Captura de pantalla

      // And El usuario intenta salir de la página
      membersPage.getMembersBackLink().click();

      // Then Se muestra un mensaje de confirmación
      // (Agregar verificaciones para el mensaje de confirmación)
      cy.screenshot("Confirmation Message"); // Captura de pantalla

      // When El usuario hace clic en 'Stay'
      membersPage.getStayButton().click();
      cy.screenshot("Stay Confirmation"); // Captura de pantalla

      // Then La información ingresada permanece en los campos
      // (Agregar verificaciones para confirmar que la información sigue presente)

      // When El usuario completa el campo 'email' con una dirección de correo válida
      const memberEmail = faker.internet.email();
      membersPage.getMemberEmailInput().type(memberEmail);
      cy.screenshot("Member Email"); // Captura de pantalla

      // And El usuario hace clic en 'Save'
      membersPage.getSaveButton().click();
      cy.screenshot("Member Saved"); // Captura de pantalla

      // Then La información de 'signup' se actualiza correctamente
      // (Agregar verificaciones para la actualización de la información de 'signup')

      // When El usuario regresa a la lista de 'Members'
      membersPage.getMembersBackLink().click();
      cy.screenshot("Members List"); // Captura de pantalla

      // Then El nuevo miembro agregado aparece en la lista de miembros
      // (Agregar verificaciones para confirmar que el nuevo miembro está en la lista)
    }); 
  });
});
