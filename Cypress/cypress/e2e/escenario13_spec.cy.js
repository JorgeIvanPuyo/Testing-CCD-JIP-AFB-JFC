import { APP_PAGE, USER, PASSWORD } from "../const";
import { SigninPage } from "../units/login/SignInPage";
import { DeletePostPage } from "../units/deletePost/DeletePostPage";

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

            const post = new DeletePostPage(cy)
            post.navigateToPosts();
            cy.wait(1000);

            // Usar el nuevo método para seleccionar un post en estado 'Draft'
            post.getDraftPostToDelete().rightclick();

            // Agregar captura de pantalla después de hacer clic derecho en el Post a eliminar
            cy.screenshot('Clic derecho en el Post a eliminar');

            // Continuar con la lógica para eliminar el post
            post.getDeleteButton().click();
            
            // Agregar captura de pantalla después de hacer clic en el botón de eliminar
            cy.screenshot('Haciendo clic en el botón Eliminar');

            // Continuar con la lógica para cancelar la eliminación del post
            post.getCancelButton().click();

            // Agregar captura de pantalla después de hacer clic en el botón Cancelar
            cy.screenshot('Haciendo clic en el botón Cancelar');
        });
    });
});
