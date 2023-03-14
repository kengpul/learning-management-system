describe("Student take quiz", () => {
  beforeEach(() => {
    cy.login();
  });

  it("take the quiz as a student", () => {
    cy.getByData("quiz").click();
    cy.url().should("eq", "http://localhost:3001/quiz/");

    cy.getByData("quiz-card").first().click();
    cy.getByData("choice1").click();
    cy.getByData("next-question").contains("Next").click();

    cy.getByData("submit").contains("Submit").click();
  });
});
