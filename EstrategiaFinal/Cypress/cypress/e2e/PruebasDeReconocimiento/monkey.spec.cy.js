function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  describe("Ghost 5.72 under monkeys", function () {
    it("visits ghost and survives monkeys", function () {
      login();
      cy.wait(1000);
      randomEvent(20);
    });
  });
  
  function login(){
    cy.visit("http://157.230.86.220:5720/ghost/");                                              
    cy.wait(1000);
    cy.get('input[name="identification"]').type("example@test.com", { force: true }); 
    cy.get('input[name="password"]').type("Test123456", { force: true });                   
    cy.get('button').eq(1).click();
  }
  
  function randomEvent(monkeysLeft) {
    var monkeysLeft = monkeysLeft;
    if (monkeysLeft > 0) {
      const events = [
        "randomClickLink",
        "randomFillTextBox",
        "randomCombobox",
        "randomClickButton",
      ];
  
      const event = events[getRandomInt(0, events.length)];
  
      switch (event) {
        case "randomClickLink":
          randomClickLink();
          break;
        case "randomFillTextBox":
          randomFillTextBox();
          break;
        case "randomCombobox":
          randomCombobox();
          break;
        case "randomClickButton":
          randomClickButton();
          break;
      }
      monkeysLeft = monkeysLeft - 1;
      cy.wait(1000);
      randomEvent(monkeysLeft);
    }
  }
  
  function randomClickLink() {
    console.log("randomClickLink ejecutado");
    cy.get("a").then(($links) => {
      var randomLink = $links.get(getRandomInt(0, $links.length));
      if (!Cypress.dom.isHidden(randomLink)) {
        cy.wrap(randomLink).click({ force: true });
      }
    });
  }
  
  function randomFillTextBox() {
    console.log("randomFillTextBox ejecutado");
    cy.window().then((win) => {
      const inputElements = win.document.querySelectorAll("input");
      if (inputElements.length > 0) {
        cy.get("input").then(($inputs) => {
          if ($inputs.length > 0) {
            var randomInput = $inputs.get(getRandomInt(0, $inputs.length));
            if (!Cypress.dom.isHidden(randomInput)) {
              cy.wrap(randomInput).type("Texto de prueba", { force: true });
            }
          }
        });
      } else {
        console.log("La página no tiene campos de entrada (input).");
      }
    });
  }
  
  function randomCombobox() {
    console.log("randomCombobox ejecutado");
    cy.window().then((win) => {
      const selectElements = win.document.querySelectorAll("select");
      if (selectElements.length > 0) {
        cy.get("select").then(($selects) => {
          if ($selects.length > 0) {
            var randomSelect = $selects.get(getRandomInt(0, $selects.length));
            if (!Cypress.dom.isHidden(randomSelect)) {
              const options = randomSelect.getElementsByTagName("option");
              var randomOption = options[getRandomInt(0, options.length)];
              cy.wrap(randomSelect).select(randomOption.value, { force: true });
            }
          }
        });
      } else {
        console.log("La página no tiene elementos de combobox (select).");
      }
    });
  }
  
  function randomClickButton() {
    console.log("randomClickButton ejecutado");
    cy.window().then((win) => {
      const buttonElements = win.document.querySelectorAll("button");
      if (buttonElements.length > 0) {
        cy.get("button").then(($buttons) => {
          if ($buttons.length > 0) {
            var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
            if (!Cypress.dom.isHidden(randomButton)) {
              cy.wrap(randomButton).click({ force: true });
            }
          }
        });
      } else {
        console.log("La página no tiene botones (button).");
      }
    });
  }
  