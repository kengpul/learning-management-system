describe("Profile", () => {
  beforeEach(() => {
    cy.login();
    cy.getByData("view-profile").contains("View Profile").click();
    cy.url().should(
      "eq",
      "http://localhost:3001/profile/6423f911db0d57362447b1dc"
    );
  });

  it("Edit Profile", () => {
    cy.getByData("edit-profile").click();
    cy.getByData("edit-fullname").clear().type("jhon test");
    cy.getByData("edit-email").clear().type("jhontest@gmail.com");
    cy.getByData("submit-edit").contains("Update").click();
  });

  it("verify if updated", () => {
    cy.getByData("fullname").contains("jhon test");
  });
});
