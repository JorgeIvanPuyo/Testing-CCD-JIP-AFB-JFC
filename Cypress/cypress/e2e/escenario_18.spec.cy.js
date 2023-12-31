import { APP_PAGE, USER, PASSWORD } from "../const";
import { SigninPage } from "../units/login/SignInPage";
import { faker } from "@faker-js/faker";
import { CreateMemberPage } from "../units/createMember/CreateMemberPage";

const TITLE_PUBLISH_PAGE = "Boom. It’s out there";

describe("Gestión de Miembros en la Comunidad", function () {
  it("Intentar crear un nuevo miembro y luego abandonar el proceso", function () {
    // Given Un usuario con credenciales válidas
    cy.visit(`${APP_PAGE}/ghost/#/signin`);
    cy.wait(1000);
    cy.screenshot("1_login_page");

    const signinPage = new SigninPage(cy);
    const membersPage = new CreateMemberPage(cy);

    // When El usuario inicia sesión con 'user' y 'password' válidos
    signinPage.loginValidUser(USER, PASSWORD);
    cy.url().should("contain", "/dashboard");
    cy.screenshot("2_dashboard");

    // And El usuario hace clic en 'Members' en el panel de navegación
    membersPage.navigateToMembers();
    cy.screenshot("3_members_page");

    // And El usuario hace clic en 'New Member'
    membersPage.getNewMemberButton().click();
    cy.screenshot("4_new_member_page");

    // And El usuario completa el campo 'nombre' con un nombre válido
    const memberName = faker.person.fullName();
    membersPage.getMemberNameInput().type(memberName);

    const memberEmail = faker.internet.email();
    membersPage.getMemberEmailInput().type(memberEmail);

    // And El usuario completa el campo 'labels' con etiquetas relevantes
    const labels = faker.lorem.word();
    membersPage.getEmberPowerSelectInput().type(`${labels}{enter}`);

    // And El usuario completa el campo 'note' con una nota relevante
    const note = faker.lorem.sentence();
    membersPage.getMemberNoteTextarea().type(note);

    // And El usuario hace clic de nuevo en 'Members'
    membersPage.getMembersBackLink().click();
    cy.screenshot("5_leave_confirmation");

    // Then Se muestra un mensaje de confirmación de abandono
    // Aquí se asume que hay un mecanismo para detectar el intento de navegación y mostrar un mensaje de confirmación

    // When El usuario hace clic en 'Leave'
    membersPage.getLeaveButton().click();

    // Then El nuevo miembro no se crea y no aparece en la lista de miembros
    // Aquí se necesitaría una lógica para verificar que el miembro no fue creado, como buscar en la lista de miembros

    membersPage.memberDoesNotExist(memberEmail).then((result) => {
      expect(result).to.be.true;
    });
  });
});
