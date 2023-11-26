import { APP_PAGE, USER, PASSWORD } from "../const";
import { SigninPage } from "../units/login/SignInPage";
import { TagPage } from "../units/tags/TagPage";
import { faker } from "@faker-js/faker";

describe("Creación de tags internos en la plataforma", function () {
    it("Creación de un nuevo internal tag con nombre inválido URL e2e - datos aleatorios usando 'Faker'", function () {
        // Given Un usuario con credenciales válidas
        cy.visit(`${APP_PAGE}/ghost/#/signin`);
        const signinPage = new SigninPage(cy);
        const tagPage = new TagPage(cy);

        // When El usuario inicia sesión con 'user' y 'password' válidos
        signinPage.loginValidUser(USER, PASSWORD);
        cy.url().should("contain", "/dashboard");

        // And El usuario hace clic en el botón 'Tags' en el panel de navegación
        tagPage.navigateToTags();

        // And El usuario hace clic en 'Internal Tags'
        tagPage.getInternalTag().click({ multiple: true });

        // And El usuario hace clic en 'Create New Internal Tag'
        tagPage.getCreateNewTagInternal().click();

        // And El usuario introduce un nombre inválido en formato URL en el campo 'Nombre'
        const tagName = faker.internet.url(); // Usar URL como nombre inválido
        tagPage.getTagNameInput().type(tagName);

        // And El usuario agrega un color en el campo 'Color'
        const tagColor = faker.internet.color();
        tagPage.getTagAccentColorInput().type(tagColor.substring(1)); // Remover '#' del color

        // And El usuario agrega un slug en el campo 'Slug'
        const tagSlug = faker.lorem.slug();
        tagPage.getTagSlugInput().type(tagSlug);

        // Then Se valida que la vista previa del slug ha cambiado
        tagPage.getTagSlugPreview().should('contain', tagSlug);

        // And El usuario agrega una descripción en el campo 'Descripción'
        const tagDescription = faker.lorem.sentence();
        tagPage.getTagDescriptionTextarea().type(tagDescription);

        // And El usuario hace clic en 'Save'
        tagPage.getSaveButton().click();

        // And El usuario hace clic en 'Tags' en el panel de navegación
        tagPage.navigateToTags();

        // Then Se valida que se haya creado un nuevo tag
        cy.contains(tagName).should('exist');
    });
});
