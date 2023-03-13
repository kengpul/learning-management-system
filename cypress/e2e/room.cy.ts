describe("Room", () => {
  beforeEach(() => {
    cy.login();
    cy.getByData("room").click();
  });

  it("should visit room", () => {
    cy.url().should("eq", "http://localhost:3001/room/");
  });

  it("create room", () => {
    cy.getByData("create").click();
    cy.getByData("name").type("CSPRAC - CS Practicum");
    cy.getByData("code").type("Password1");
    cy.getByData("create-room").click();
  });

  it("update the links", () => {
    cy.get(".card-title").click();
    cy.getByData("attendance").click();
    cy.getByData("input-attendance").type(
      "https://drive.google.com/drive/my-drive"
    );
    cy.getByData("input-meeting").type("https://zoom.us/");
    cy.getByData("update").click();
  });
});
