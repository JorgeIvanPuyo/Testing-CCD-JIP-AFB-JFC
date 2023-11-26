import { APP_PAGE, USER, PASSWORD } from "../const";
import { SigninPage } from "../units/login/SignInPage";

import { faker } from "@faker-js/faker";
import { getAprioriMemberData, getPseudoRamdonData } from "../utils";

describe("Como usuario validar la NO creación de un nuevo miembro con un email no valido para asegurar la calidad del software", function () {
  it("e2e - datos aleatorios usando 'Faker' ", function () {
    cy.visit(`${APP_PAGE}/ghost/#/signin`);
    cy.wait(2000);

    cy.window().then((win) => {
      // Give: Usuario ingrese al login
      const signinPage = new SigninPage(cy);
      // When: digite sus datos y haga click sobre entrar
      const homePage = signinPage.loginValidUser(USER, PASSWORD);
      // Then: el usuario ingresa al dashboard
      homePage.getUrl().should("contain", "/dashboard");

      // Given: El usuario esta en el dashboard
      // When: el usuario hace click sobre el boton de miembros
      const memberPage = homePage.goToMembers();
      cy.wait(500);
      // Then: el usuario esta en la pagina de miembros
      memberPage.getUrl().should("contain", "/members");

      //Given: El usuario esta en la pagina de miembros
      // When: el usuario hace click sobre el boton de crear nuevo miembro
      const createMemberPage = memberPage.goToCreateMember();
      cy.wait(500);
      // Then: el usuario estara en la pagina para crear un nuevo miembro
      createMemberPage.getUrl().should("contain", "/members/new");

      // Given: Data generada de forma aleatorea
      const name = faker.name.firstName();
      const email = faker.name.lastName();
      // When: el usuario ingresa los datos del nuevo miembro
      createMemberPage.fillName(name);
      createMemberPage.fillEmail(email);
      // When: el usuario hace click sobre crear miembro
      createMemberPage.clickToSave();
      cy.wait(1000);
      // Then: el usuario podra ver el mensaje de error de email y el boton cambio de estado
      createMemberPage.getEmailError().should("contain", "Invalid Email");
      createMemberPage.getRetryButton().should("exist");
    });
  });

  it("e2e - datos pseudo aleatorios usando 'Mockaroo API' ", function () {
    cy.visit(`${APP_PAGE}/ghost/#/signin`);
    cy.wait(1000);

    cy.window().then(async (win) => {
      // Give: Usuario ingrese al login
      const signinPage = new SigninPage(cy);
      // When: digite sus datos y haga click sobre entrar
      const homePage = signinPage.loginValidUser(USER, PASSWORD);
      // Then: el usuario ingresa al dashboard
      homePage.getUrl().should("contain", "/dashboard");

      // Given: El usuario esta en el dashboard
      // When: el usuario hace click sobre el boton de miembros
      const memberPage = homePage.goToMembers();
      cy.wait(500);
      // Then: el usuario esta en la pagina de miembros
      memberPage.getUrl().should("contain", "/members");

      //Given: El usuario esta en la pagina de miembros
      // When: el usuario hace click sobre el boton de crear nuevo miembro
      const createMemberPage = memberPage.goToCreateMember();
      cy.wait(500);
      // Then: el usuario estara en la pagina para crear un nuevo miembro
      createMemberPage.getUrl().should("contain", "/members/new");

      // Given: Data generada de forma pseudo aleatorea
      const { name, wrongEmail: email } = await getPseudoRamdonData();
      // When: el usuario ingresa los datos del nuevo miembro
      createMemberPage.fillName(name);
      createMemberPage.fillEmail(email);
      // When: el usuario hace click sobre crear miembro
      createMemberPage.clickToSave();
      cy.wait(500);
      // Then: el usuario podra ver el mensaje de error de email y el boton cambio de estado
      createMemberPage.getEmailError().should("contain", "Invalid Email");
      createMemberPage.getRetryButton().should("exist");
    });
  });

  it("e2e - datos a-priori usando 'Mockaroo JSON' ", function () {
    cy.visit(`${APP_PAGE}/ghost/#/signin`);
    cy.wait(1000);

    cy.window().then((win) => {
      // Give: Usuario ingrese al login
      const signinPage = new SigninPage(cy);
      // When: digite sus datos y haga click sobre entrar
      const homePage = signinPage.loginValidUser(USER, PASSWORD);
      // Then: el usuario ingresa al dashboard
      homePage.getUrl().should("contain", "/dashboard");

      // Given: El usuario esta en el dashboard
      // When: el usuario hace click sobre el boton de miembros
      const memberPage = homePage.goToMembers();
      cy.wait(500);
      // Then: el usuario esta en la pagina de miembros
      memberPage.getUrl().should("contain", "/members");

      //Given: El usuario esta en la pagina de miembros
      // When: el usuario hace click sobre el boton de crear nuevo miembro
      const createMemberPage = memberPage.goToCreateMember();
      cy.wait(500);
      // Then: el usuario estara en la pagina para crear un nuevo miembro
      createMemberPage.getUrl().should("contain", "/members/new");

      // Given: Data generada de forma pseudo aleatorea
      const { name, wrongEmail: email } = getAprioriMemberData(6);
      // When: el usuario ingresa los datos del nuevo miembro
      createMemberPage.fillName(name);
      createMemberPage.fillEmail(email);
      // When: el usuario hace click sobre crear miembro
      createMemberPage.clickToSave();
      cy.wait(500);
      // Then: el usuario podra ver el mensaje de error de email y el boton cambio de estado
      createMemberPage.getEmailError().should("contain", "Invalid Email");
      createMemberPage.getRetryButton().should("exist");
    });
  });
});
