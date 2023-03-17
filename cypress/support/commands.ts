/// <reference types="cypress" />
// ***********************************************

Cypress.Commands.add("getByData", (selector) => {
  return cy.get(`[data-cy=${selector}]`);
});

// paul paul2424
// jhon Password1

Cypress.Commands.add("login", () => {
  cy.visit("http://localhost:3001/connect");
  cy.getByData("login-username").type("jhon");
  cy.getByData("login-password").type("Password1");
  cy.getByData("login").click();
  cy.url().should("eq", "http://localhost:3001/feed/");
});
