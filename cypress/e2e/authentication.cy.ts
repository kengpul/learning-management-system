describe("Authentication", () => {
  it("should load landing page", () => {
    cy.visit("http://localhost:3001/");
  });

  it("should go to authentication page", () => {
    cy.visit("http://localhost:3001/");
    cy.get(".authenticate-button").contains("Login/Register").click();
    cy.url().should("eq", "http://localhost:3001/connect");
  });

  it("shoud sign up", () => {
    cy.visit("http://localhost:3001/connect");
    cy.getByData("signup-toggle").contains("Sign up").click();
    cy.getByData("username").type("jhon");
    cy.getByData("email").type("jhon@gmail.com");
    cy.getByData("password").type("Password1");
    cy.getByData("type").select("Teacher");
    cy.getByData("signup").click();
    cy.get("[role=alert]").contains("Success, you may now sign in");
  });

  it("should log in", () => {
    cy.visit("http://localhost:3001/connect");
    cy.getByData("login-username").type("jhon");
    cy.getByData("login-password").type("Password1");
    cy.getByData("login").click();
    cy.url().should("eq", "http://localhost:3001/feed/");
  });
});
