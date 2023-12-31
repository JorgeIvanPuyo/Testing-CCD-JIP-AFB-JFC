import { APP_PAGE, USER, PASSWORD } from "../const";
import { SigninPage } from "../units/login/SignInPage";
import { faker } from "@faker-js/faker";
import { CreateMemberPage } from "../units/createMember/CreateMemberPage";

const TITLE_PUBLISH_PAGE = "Boom. It’s out there";
describe("Gestión de Miembros en la Comunidad", function () {
    it("Intentar crear un nuevo miembro y luego abandonar el proceso", function () {
      // Given Un usuario con credenciales válidas
      cy.visit(`${APP_PAGE}/ghost/#/signin`);
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
      cy.wait(1000);
      
      const signinPage = new SigninPage(cy);
      const membersPage = new CreateMemberPage(cy);
  
      // When El usuario inicia sesión con 'user' y 'password' válidos
      signinPage.loginValidUser(USER, PASSWORD);
      cy.url().should("contain", "/dashboard");
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // And El usuario navega a la página de 'Members'
      cy.wait(100);
      membersPage.navigateToMembers();
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // And El usuario hace clic en 'New Member'
      membersPage.getNewMemberButton().click();
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // And El usuario completa el campo 'nombre' con un nombre válido
      const memberName = faker.person.fullName();
      membersPage.getMemberNameInput().type(memberName,{force: true});
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
      
      const memberEmail = faker.internet.email();
      membersPage.getMemberEmailInput().type(memberEmail);
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // And El usuario completa el campo 'labels' con etiquetas relevantes
      const labels = faker.lorem.word();
      membersPage.getLabelMember().type(`${labels}{enter}`);
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // And El usuario completa el campo 'note' con una nota relevante
      const note = faker.lorem.sentence();
      membersPage.getMemberNoteTextarea().type(note);
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // And El usuario intenta salir de la página
      membersPage.navigateToMembers();
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // Then Se muestra un mensaje de confirmación de abandono
      // Aquí se asume que hay un mecanismo para detectar el intento de navegación y mostrar un mensaje de confirmación
  
      // When El usuario hace clic en 'Leave'
      membersPage.getLeaveButton().click();
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // Then El nuevo miembro no se crea y no aparece en la lista de miembros
      membersPage.memberDoesNotExist(memberEmail).then(result => {
        expect(result).to.be.true;
        cy.screenshot({
          capture: "viewport",
          scale: true,
        });
      });
    });
});
