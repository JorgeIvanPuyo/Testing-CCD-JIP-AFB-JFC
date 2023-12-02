import { APP_PAGE, USER, PASSWORD } from "../const";
import { SigninPage } from "../units/login/SignInPage";
import { TagPage } from "../units/tags/TagPage";
import { ModifyPostPage } from "../units/modifyPost/ModifyPostPage";
import { faker } from "@faker-js/faker";
import { getPseudoRamdonMemeber,getBaseUrl } from "../utils";


describe("Gestión de Tags en la Plataforma con Naughty Strings", function () {
    it("Asignación de un nuevo tag con nombre inválido a un post e2e - datos Naughty Strings", async function () {
        // Given Un usuario con credenciales válidas
        const { maliciousData } = await getPseudoRamdonMemeber();
        cy.visit(`${APP_PAGE}/ghost/#/signin`);
        const signinPage = new SigninPage(cy);
        const tagPage = new TagPage(cy);
        const modifyPostPage = new ModifyPostPage(cy);

        // When El usuario inicia sesión con 'user' y 'password' válidos
        signinPage.loginValidUser(USER, PASSWORD);
        cy.url().should("contain", "/dashboard");

        // And El usuario hace clic en el botón 'Tags' en el panel de navegación
        tagPage.navigateToTags();

        // And El usuario hace clic en 'Internal Tags'
        tagPage.getInternalTag().click({ multiple: true });

        // And El usuario hace clic en 'Create New Internal Tag'
        tagPage.getCreateNewTagInternal().click();

        // And El usuario introduce un nombre inválido 'maliciousData' en el campo 'Nombre'
        tagPage.getTagNameInput().type(maliciousData);

        // And El usuario agrega un color en el campo 'Color'
        const tagColor = faker.internet.color();
        tagPage.getTagAccentColorInput().type(tagColor.substring(1)); // Remover '#' del color

        // And El usuario agrega un slug en el campo 'Slug'
        const tagSlug = faker.lorem.slug();
        tagPage.getTagSlugInput().type(tagSlug);

        // Then Se valida que la vista previa del slug ha cambiado
        tagPage.getTagSlugPreview().should('contain', tagSlug);

        // And El usuario agrega 'maliciousData' en el campo 'Descripción'
        tagPage.getTagDescriptionTextarea().type(maliciousData);

        // And El usuario hace clic en 'Save'
        tagPage.getSaveButton().click();

        // And El usuario hace clic en 'Tags' en el panel de navegación
        tagPage.navigateToTags();

        // Then Se valida que se haya creado un nuevo tag
        cy.contains(maliciousData).should('exist');

        // And El usuario hace clic en 'Posts'
        cy.wait(1000)
        modifyPostPage.navigateToPosts();
        cy.wait(1000)

        // And El usuario selecciona un post publicado
        modifyPostPage.getPublishedPostToModify().click();

        // And El usuario hace clic en el menú colapsable 'Settings'
        modifyPostPage.getPostSettings().click();

        // And El usuario hace clic en 'Tags'
        modifyPostPage.getTagInputDiv().click();
        modifyPostPage.getFirstEmberPowerSelectOption().click();

        // Then Se valida que el tag recién creado esté disponible
        cy.contains(maliciousData).should('exist');

        // And El usuario hace clic en el nuevo tag
        cy.contains(maliciousData).click();

        // And El usuario hace clic en 'Update'
        cy.wait(1000);
        modifyPostPage.getPostSettings().click();
        modifyPostPage.getUpdateButton().click();
        modifyPostPage.getPostSettings().click();

        // Then Se valida que la página tenga el nuevo tag asignado al post
        cy.contains(maliciousData).should('exist');
    });
});
