import { APP_PAGE, USER, PASSWORD } from "../const";
import { SigninPage } from "../units/login/SignInPage";
import { faker } from "@faker-js/faker";
import { ModifyPostPage } from "../units/modifyPost/ModifyPostPage";
import { TagPage } from "../units/tags/TagPage";

const TITLE_PUBLISH_PAGE = "Boom. It’s out there";
describe("Gestión de Tags en la Plataforma", function () {
    it("Crear un nuevo tag y asignarlo a un post", function () {
      // Given Un usuario con credenciales válidas
      cy.visit(`${APP_PAGE}/ghost/#/signin`);
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
      const signinPage = new SigninPage(cy);
      const modifyPostPage = new ModifyPostPage(cy);
      const createTagPage = new TagPage(cy);
  
      // When El usuario inicia sesión con 'user' y 'password' válidos
      signinPage.loginValidUser(USER, PASSWORD);
      cy.url().should("contain", "/dashboard");
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // And El usuario hace clic en el botón 'Tags' en el panel de navegación
      cy.wait(100);
      createTagPage.navigateToTags();
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // And El usuario hace clic en 'New Tag'
      createTagPage.getNewTagButton().click();
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // And El usuario agrega un 'nombre' para el tag
      const tagName = faker.lorem.word();
      createTagPage.getTagNameInput().type(tagName);
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // And El usuario agrega un 'color' para el tag
      const tagColor = faker.internet.color();
      createTagPage.getTagAccentColorInput().type(tagColor.substring(1)); // Remover '#' del color
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // And El usuario agrega un 'slug' para el tag
      const tagSlug = faker.lorem.slug();
      createTagPage.getTagSlugInput().type(tagSlug);
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // Then Se valida que la vista previa del 'slug' cambió
      createTagPage.getTagSlugPreview().should('contain', tagSlug);
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // And El usuario agrega una 'descripción' para el tag
      const tagDescription = faker.lorem.sentence();
      createTagPage.getTagDescriptionTextarea().type(tagDescription);
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // And El usuario hace clic en 'Save'
      createTagPage.getSaveButton().click();
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // And El usuario hace clic en 'Tags'
      createTagPage.navigateToTags();
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // Then Se valida que se haya creado un tag nuevo
      cy.contains(tagName).should('exist');
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // And El usuario hace clic en 'Posts'
      modifyPostPage.navigateToPosts();
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // And El usuario selecciona un post publicado
      modifyPostPage.getPublishedPostToModify().click();
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // And El usuario hace clic en el menú colapsable 'Settings'
      modifyPostPage.getSettingsButton().click();
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // And El usuario hace clic en 'Tags'
      modifyPostPage.getTagInputDiv().click();
      modifyPostPage.getFirstEmberPowerSelectOption().click();
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // Then Se valida que el tag recién creado esté disponible
      cy.contains(tagName).should('exist');
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // And El usuario hace clic en el nuevo tag
      cy.contains(tagName).click();
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // And El usuario hace clic en el menú colapsable 'Settings'
      modifyPostPage.getSettingsButton().click();
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // And El usuario hace clic en 'Update'
      modifyPostPage.getUpdateButton().click();
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // And El usuario hace clic en el menú colapsable 'Settings'
      modifyPostPage.getSettingsButton().click();
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
  
      // Then Se valida que la página tenga el nuevo tag asignado al post
      cy.contains(tagName).should('exist');
      cy.screenshot({
        capture: "viewport",
        scale: true,
      });
    });
});
