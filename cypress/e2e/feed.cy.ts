describe("Feed", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should work", () => {
    cy.getByData("create").click();
  });
});
