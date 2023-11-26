import { APP_PAGE, USER, PASSWORD } from "../const";
import { CreateMemberPage } from "../units/createMember/CreateMemberPage";
import { SigninPage } from "../units/login/SignInPage";

import { faker } from "@faker-js/faker"; // Asegúrate de que esta versión de faker soporte los métodos utilizados

describe("Gestión de miembros en la plataforma", function () {
  it("Creación de un nuevo member con nombre inválido e2e - datos aleatorios usando 'Faker'", function () {
    cy.visit(`${APP_PAGE}/ghost/#/signin`);
    cy.wait(1000);

    cy.window().then((win) => {
      // Given: Usuario ingrese al login
      const signinPage = new SigninPage(cy);
      // When: El usuario inicia sesión con 'user' y 'password' válidos
      const homePage = signinPage.loginValidUser(USER, PASSWORD);
      // Then: El usuario ingresa al dashboard
      homePage.getUrl().should("contain", "/dashboard");

      // Given: El usuario navega a la sección de miembros
      const members = new CreateMemberPage(cy);
      members.navigateToMembers();

      // When: El usuario crea un nuevo miembro
      members.getNewMemberButton().click();

      // Completar texto nombre con un formato correo o URL
      const memberName = faker.internet.email(); // Usar email como nombre inválido
      members.getMemberNameInput().type(memberName);

      // Completar texto email
      const memberEmail = faker.internet.email();
      members.getMemberEmailInput().type(memberEmail);

      // Intentar guardar el miembro
      members.getSaveButton().click();

      // Then: Validar que no se crea el miembro
      // Aquí debes añadir las verificaciones correspondientes
      // Por ejemplo, comprobar si aparece un mensaje de error o si el miembro no está en la lista
    });
  });
});
