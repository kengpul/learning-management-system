describe("Feed", () => {
  beforeEach(() => {
    cy.login();
  });

  it("create post", () => {
    cy.getByData("create").click();
    cy.url().should("eq", "http://localhost:3001/feed/create");
    cy.get(".ql-editor").type("test post");
    cy.get(".css-qbdosj-Input").click();
    cy.get("#react-select-3-option-0").click();
    cy.getByData("post").contains("Post").click();
    cy.url().should("eq", "http://localhost:3001/feed/");
  });

  it("update post", () => {
    cy.getByData("toggle-modify-post").first().click();
    cy.getByData("toggle-edit").first().click();
    cy.get(".ql-editor").contains("test post").type(" edited");
    cy.getByData("post").contains("Post").click();
    cy.url().should("eq", "http://localhost:3001/feed/");
  });

  it("delete post", () => {
    cy.getByData("toggle-modify-post").first().click();
    cy.getByData("toggle-delete").first().click();
    cy.url().should("eq", "http://localhost:3001/feed/");
  });
});
