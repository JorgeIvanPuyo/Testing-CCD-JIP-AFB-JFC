import { APP_PAGE, USER, PASSWORD } from "../const";
import { CreateMemberPage } from "../units/createMember/CreateMemberPage";
import { SigninPage } from "../units/login/SignInPage";
import { getAprioriPostData, getPseudoRamdonData, getSlug,getPseudoRamdonMemeber } from "../utils";

import { faker } from "@faker-js/faker";

describe("Como usuario quiero crear miembros para gestionar mi comunidad", function () {
  it("e2e - datos aleatorios usando 'Faker'", function () {
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
      members.navigateToMembers();

      // When: El usuario crea un nuevo miembro
      members.getNewMemberButton().click();

      // Agregar captura de pantalla después de hacer clic en "New Member"
      cy.screenshot('Clic en "New Member"');

      cy.wait(1000);
      const memberName = faker.person.fullName();
      const memberEmail = faker.internet.email();
      members.getMemberNameInput().type(memberName);
      members.getMemberEmailInput().type(memberEmail);

      // Agregar captura de pantalla después de ingresar datos y antes de hacer clic en "Save"
      cy.screenshot('Ingreso de datos del nuevo miembro');

      members.getSaveButton().click();

      // Agregar captura de pantalla después de hacer clic en "Save"
      cy.screenshot('Clic en "Save"');

      // Then: El usuario ha creado el miembro y puede verificar su existencia
      // Aquí puedes agregar las verificaciones necesarias para confirmar la creación del miembro
      // Por ejemplo, buscar el miembro en la lista de miembros, etc.
    }); 
  });
describe("Creación de miembros con datos de Mockaroo API", function () {
    it("e2e - datos pseudo aleatorios usando 'Mockaroo API'", function () {
        cy.visit(`${APP_PAGE}/ghost/#/signin`);
        cy.wait(1000);

        cy.window().then(async (win) => {
            // Give: Usuario ingresa sus datos al login
            const signinPage = new SigninPage(cy);
            // When: Haga click sobre el boton de entrar
            const homePage = signinPage.loginValidUser(USER, PASSWORD);
            // Then: el usuario ingresa al dashboard
            homePage.getUrl().should("contain", "/dashboard");

            // Given: estando en el dashboard
            const members = new CreateMemberPage(cy);
            // When: El usuario navega a la sección de miembros
            members.navigateToMembers();

            // When: Se crean datos pseudo aleatorios
            const { name, email } = await getPseudoRamdonMemeber();

            // When: El usuario crea un nuevo miembro
            members.getNewMemberButton().click();
            members.getMemberNameInput().type(name);
            members.getMemberEmailInput().type(email);

            // When: El usuario guarda el nuevo miembro
            members.getSaveButton().click();

            // Then: Se valida que el usuario haya creado el miembro
            // Aquí puedes agregar las verificaciones necesarias para confirmar la creación del miembro
            // Por ejemplo, buscar el miembro en la lista de miembros, etc.
        });
    });
});

});
