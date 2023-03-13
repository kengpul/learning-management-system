/// <reference types="cypress" />
// ***********************************************

Cypress.Commands.add("getByData", (selector) => {
  return cy.get(`[data-cy=${selector}]`);
});

Cypress.Commands.add("login", () => {
  cy.visit("http://localhost:3001/connect");
  cy.getByData("login-username").type("paul");
  cy.getByData("login-password").type("paul2424");
  cy.getByData("login").click();
  cy.url().should("eq", "http://localhost:3001/feed/");
});
