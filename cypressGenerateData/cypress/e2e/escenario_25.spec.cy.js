import { APP_PAGE, USER, PASSWORD } from "../const";
import { SigninPage } from "../units/login/SignInPage";
import { TagPage } from "../units/tags/TagPage";
import { ModifyPostPage } from "../units/modifyPost/ModifyPostPage";
import { faker } from "@faker-js/faker";
import { getPseudoRamdonMemeber } from "../utils";


describe("Gestión de Tags en la Plataforma", function () {
    it("Asignación de un nuevo tag con nombre inválido a un post e2e - datos aleatorios usando 'Faker'", function () {
        // Given Un usuario con credenciales válidas
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

        // And El usuario hace clic en 'Posts'
        modifyPostPage.navigateToPosts();

        // And El usuario selecciona un post publicado
        modifyPostPage.getPublishedPostToModify().click();

        // And El usuario hace clic en el menú colapsable 'Settings'
        modifyPostPage.getPostSettings().click();

        // And El usuario hace clic en 'Tags'
        modifyPostPage.getTagInputDiv().click();
        modifyPostPage.getFirstEmberPowerSelectOption().click();

        // Then Se valida que el tag recién creado esté disponible
        cy.contains(tagName).should('exist');

        // And El usuario hace clic en el nuevo tag
        cy.contains(tagName).click();

        // And El usuario hace clic en 'Update'
        cy.wait(1000)
        modifyPostPage.getPostSettings().click();
        modifyPostPage.getUpdateButton().click();
        modifyPostPage.getPostSettings().click();


        // Then Se valida que la página tenga el nuevo tag asignado al post
        cy.contains(tagName).should('exist');
    });
});
describe("Gestión de Tags en la Plataforma", function () {
    it("Asignación de un nuevo tag con nombre inválido a un post e2e - datos Apriori usando 'Mockaroo'", async function () {
        // Given Un usuario con credenciales válidas
        cy.visit(`${APP_PAGE}/ghost/#/signin`);
        const signinPage = new SigninPage(cy);
        const tagPage = new TagPage(cy);
        const modifyPostPage = new ModifyPostPage(cy);
        const {  url,description } = await getPseudoRamdonMemeber();


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
        tagPage.getTagNameInput().type(url);

        // And El usuario agrega un color en el campo 'Color'
        const tagColor = faker.internet.color();
        tagPage.getTagAccentColorInput().type(tagColor.substring(1)); // Remover '#' del color

        // And El usuario agrega un slug en el campo 'Slug'
        const tagSlug = faker.lorem.slug();
        tagPage.getTagSlugInput().type(tagSlug);

        // Then Se valida que la vista previa del slug ha cambiado
        tagPage.getTagSlugPreview().should('contain', tagSlug);

        // And El usuario agrega una descripción en el campo 'Descripción'
        tagPage.getTagDescriptionTextarea().type(description);

        // And El usuario hace clic en 'Save'
        tagPage.getSaveButton().click();

        // And El usuario hace clic en 'Tags' en el panel de navegación
        tagPage.navigateToTags();

        // Then Se valida que se haya creado un nuevo tag
        cy.contains(tagName).should('exist');

        // And El usuario hace clic en 'Posts'
        modifyPostPage.navigateToPosts();

        // And El usuario selecciona un post publicado
        modifyPostPage.getPublishedPostToModify().click();

        // And El usuario hace clic en el menú colapsable 'Settings'
        modifyPostPage.getPostSettings().click();

        // And El usuario hace clic en 'Tags'
        modifyPostPage.getTagInputDiv().click();
        modifyPostPage.getFirstEmberPowerSelectOption().click();

        // Then Se valida que el tag recién creado esté disponible
        cy.contains(tagName).should('exist');

        // And El usuario hace clic en el nuevo tag
        cy.contains(tagName).click();

        // And El usuario hace clic en 'Update'
        cy.wait(1000)
        modifyPostPage.getPostSettings().click();
        modifyPostPage.getUpdateButton().click();
        modifyPostPage.getPostSettings().click();


        // Then Se valida que la página tenga el nuevo tag asignado al post
        cy.contains(tagName).should('exist');
    });
});