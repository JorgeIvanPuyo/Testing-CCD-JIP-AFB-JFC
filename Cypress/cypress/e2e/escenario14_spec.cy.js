import { APP_PAGE, USER, PASSWORD } from "../const";
import { CreatePostPage } from "../units/createPost/CreatePostPage";
import { SigninPage } from "../units/login/SignInPage";

import { da, faker } from "@faker-js/faker";
import { PostPage } from "../units/post/postPage";
import { ModifyPostPage } from "../units/modifyPost/ModifyPostPage";

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
            const date = '2023-11-05';
            const url = "CypressTest";
            const hours = "15:00";
            const post = new ModifyPostPage(cy);
            
            post.navigateToPosts();
            cy.wait(1000);

            // Usar el nuevo método para seleccionar un post en estado 'Draft'
            post.getPublishedPostToModify().click();

            // Agregar captura de pantalla después de hacer clic en el post publicado
            cy.screenshot('Clic en el post publicado');

            post.getPostSettings().click();
            post.getPublisehModifyUrl().type(url+"{enter}",{force: true});
            
            // Agregar captura de pantalla después de ingresar la URL modificada
            cy.screenshot('Ingresando la URL modificada');

            post.getPublishedModifyDate().type(date,{force: true});
            
            // Agregar captura de pantalla después de ingresar la fecha modificada
            cy.screenshot('Ingresando la fecha modificada');

            post.getPublisehModifyHours().type(hours,{force: true});
            
            // Agregar captura de pantalla después de ingresar las horas modificadas
            cy.screenshot('Ingresando las horas modificadas');

            post.getPublishedViewPost().click();
            post.navigateToPostModifies(url.toLowerCase());
        });
    });
});
