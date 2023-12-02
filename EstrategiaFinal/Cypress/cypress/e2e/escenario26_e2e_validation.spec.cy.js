import { APP_PAGE, USER, PASSWORD } from "../const";
import { SigninPage } from "../units/login/SignInPage";
import { faker } from "@faker-js/faker";
import { ModifyPostPage } from "../units/modifyPost/ModifyPostPage";
import { TagPage} from "../units/tags/TagPage";
import { getAprioriPostData, getPseudoRamdonData, getSlug,getPseudoRamdonMemeber } from "../utils";

Cypress.on("uncaught:exception", (err, runnable) => {
    if (err.message.includes("ResizeObserver")) {
      return false;
    }
  });
  

const TITLE_PUBLISH_PAGE = "Boom. It’s out there";
describe("Gestión de Tags en la Plataforma", function () {
    it("Crear un nuevo tag con Naughty String usando Data Apriori Mockaroo JSON", async function () {
      // Given Un usuario con credenciales válidas
      const { maliciousData } = await getPseudoRamdonMemeber();
      cy.visit(`${APP_PAGE}/ghost/#/signin`);
      const signinPage = new SigninPage(cy);

  
      // When El usuario inicia sesión con 'user' y 'password' válidos
      signinPage.loginValidUser(USER, PASSWORD);
      cy.url().should("contain", "/dashboard");

      // And El usuario hace clic en el botón 'Tags' en el panel de navegación
      const tagPage = new TagPage(cy);
      tagPage.navigateToCreateTags();
      cy.wait(500)
      // And El usuario hace clic en 'New Tag'

      // And El usuario agrega un 'nombre' para el tag
      tagPage.getTagNameInput().type(maliciousData);
  
      // And El usuario agrega un 'color' para el tag
      const tagColor = faker.internet.color().substring(1); // Remover '#'
      tagPage.getTagAccentColorInput().type(tagColor);
  
      // And El usuario agrega un 'slug' para el tag
      tagPage.getTagSlugInput().type(maliciousData);
  
      // Then Se valida que la vista previa del 'slug' cambió
      tagPage.getTagSlugPreview().should('contain', maliciousData);
  
      // And El usuario agrega una 'descripción' para el tag
      tagPage.getTagDescriptionTextarea().type(maliciousData);
  
      // And El usuario hace clic en 'Save'
      tagPage.getSaveButton().click();
  
      // And El usuario hace clic en 'Tags'
      tagPage.navigateToTags();
  
      // Then Se valida que se haya creado un tag nuevo
      cy.contains(maliciousData).should('exist');
    });
});

describe("Gestión de Tags en la Plataforma", function () {
    it("Crear un nuevo tag, e2e - datos aleatorios usando 'Faker'", function () {
      // Given Un usuario con credenciales válidas
      cy.visit(`${APP_PAGE}/ghost/#/signin`);
      const signinPage = new SigninPage(cy);
      const modifyPostPage = new ModifyPostPage(cy);
      const tagPage = new TagPage(cy);
  
      // When El usuario inicia sesión con 'user' y 'password' válidos
      signinPage.loginValidUser(USER, PASSWORD);
      cy.url().should("contain", "/dashboard");
  
      // And El usuario hace clic en el botón 'Tags' en el panel de navegación
      tagPage.navigateToTags();
  
      // And El usuario hace clic en 'New Tag'
      tagPage.getNewTagButton().click();
  
      // And El usuario agrega un 'nombre' para el tag
      const tagName = faker.lorem.word();
      tagPage.getTagNameInput().type(tagName);
  
      // And El usuario agrega un 'color' para el tag
      const tagColor = faker.internet.color().substring(1); // Remover '#'
      tagPage.getTagAccentColorInput().type(tagColor);
  
      // And El usuario agrega un 'slug' para el tag
      const tagSlug = faker.lorem.slug();
      tagPage.getTagSlugInput().type(tagSlug);
  
      // Then Se valida que la vista previa del 'slug' cambió
      tagPage.getTagSlugPreview().should('contain', tagSlug);
  
      // And El usuario agrega una 'descripción' para el tag
      const tagDescription = faker.lorem.sentence();
      tagPage.getTagDescriptionTextarea().type(tagDescription);
  
      // And El usuario hace clic en 'Save'
      tagPage.getSaveButton().click();
  
      // And El usuario hace clic en 'Tags'
      tagPage.navigateToTags();
  
      // Then Se valida que se haya creado un tag nuevo
      cy.contains(tagName).should('exist');
    });
  });