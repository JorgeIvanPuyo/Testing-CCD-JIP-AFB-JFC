const { faker } = require("@faker-js/faker");

import { LOGIN_PAGE, PAGE_URL, USER, PASSWORD } from "../const";

const eventsList = [
  clickRandomLink,
  fillRandomInputIn,
  selectRandomOption,
  clickRandomButton,
];

let monkeysLeft = 20;
describe("Corriendo monkey que inicie sobre la pagina de crear Post", function () {
  it("Visiting the create post by monkey", function () {
    cy.visit(PAGE_URL);
    cy.wait(2000);
    login();

    // go to create post
    cy.get("a[data-test-nav='new-story']").click();
    cy.wait(2000);

    cy.window().then((win) => {
      const nextEvent = randomEvent();
      nextEvent(win.document);
    });
  });
});

// *** Starting Events ***

function clickRandomLink(document) {
  if (monkeysLeft < 0) return;

  cy.wait(1000);
  if (!document.querySelector("a")) {
    const nextEvent = randomEvent();
    nextEvent(document);
    return;
  }

  cy.get("a").then(($links) => {
    const randomLink = $links.get(getRandomInt(0, $links.length));
    if (!Cypress.dom.isHidden(randomLink)) {
      cy.wrap(randomLink).click({ force: true });
    }
    cy.wait(2000);
    const nextEvent = randomEvent();
    nextEvent(document);
  });
}
function fillRandomInputIn(document) {
  if (monkeysLeft < 0) return;

  cy.wait(1000);
  if (!document.querySelector("input")) {
    const nextEvent = randomEvent();
    cy.wait(1000);
    nextEvent(document);
    return;
  }

  cy.get("input").then(($inputs) => {
    const randomInput = $inputs.get(getRandomInt(0, $inputs.length));
    if (!Cypress.dom.isHidden(randomInput)) {
      cy.wrap(randomInput).type(faker.string.sample(), { force: true });
      monkeysLeft = monkeysLeft - 1;
    }
    cy.wait(1000);
    const nextEvent = randomEvent();
    nextEvent(document);
  });
}
function selectRandomOption(document) {
  if (monkeysLeft < 0) return;

  cy.wait(1000);
  if (!document.querySelector("select")) {
    const nextEvent = randomEvent();
    cy.wait(1000);
    nextEvent(document);
    return;
  }

  cy.get("select").then(($selects) => {
    const randomSelect = $selects.get(getRandomInt(0, $selects.length));
    if (!Cypress.dom.isHidden(randomSelect)) {
      cy.wrap(randomSelect).select("Option 1", { force: true });
    }
    cy.wait(1000);
    const nextEvent = randomEvent();
    nextEvent(document);
  });
}
function clickRandomButton(document) {
  if (monkeysLeft < 0) return;

  cy.wait(1000);
  if (!document.querySelector("button")) {
    const nextEvent = randomEvent();
    cy.wait(1000);
    nextEvent(document);
    return;
  }

  cy.get("button").then(($buttons) => {
    const randomButton = $buttons.get(getRandomInt(0, $buttons.length));
    if (!Cypress.dom.isHidden(randomButton)) {
      cy.wrap(randomButton).click({ force: true });
    }
    cy.wait(1000);
    const nextEvent = randomEvent();
    nextEvent(document);
  });
}
// *** End Events ***

/**
 * Returns a random event from the given array of events.
 *
 * @param {Array} events - The array of events to choose from.
 * @return {*} - The randomly selected event.
 */
function randomEvent() {
  monkeysLeft -= 1;
  const randomNumber = getRandomInt(0, eventsList.length);
  const nextEvent = eventsList[randomNumber];
  return nextEvent;
}

/**
 * Logs in the user by filling in the email and password fields and clicking the submit button.
 *
 * @return {boolean} Returns true if the login is successful, false otherwise.
 */
function login() {
  const isLoginCurrentPage = cy.url() === LOGIN_PAGE;
  if (isLoginCurrentPage) {
    return false;
  }

  cy.get("input[type='email']").type(USER);
  cy.get("input[type='password']").type(PASSWORD);
  cy.get("button[type='submit']").click();
  cy.wait(2000);

  return true;
}

function navigateToAnotherPage() {
  cy.get("a").then(($links) => {
    const randomLink = $links.get(getRandomInt(0, $links.length));
    if (!Cypress.dom.isHidden(randomLink)) {
      cy.wrap(randomLink).click();
    }
    cy.wait(1000);
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
