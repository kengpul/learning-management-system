describe("join/leave room", () => {
  beforeEach(() => {
    cy.login();
    cy.getByData("room").click();
  });

  it("visit room page", () => {
    cy.url().should("eq", "http://localhost:3001/room/");
  });

  it("join room", () => {
    cy.getByData("join").click();
    cy.getByData("input-code").type("Password1");
    cy.getByData("join-room").click();
  });

  it("visit links", () => {
    cy.get(".card-title").click();
    cy.getByData("attendance").click();
    cy.getByData("meeting").click();
  });

  it("leave room", () => {
    cy.get(".card-title").click();
    cy.getByData("toggle-leave").click();
    cy.getByData("leave").click();
  });
});
