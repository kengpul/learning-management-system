describe("Quiz", () => {
  beforeEach(() => {
    cy.login();

    cy.getByData("quiz").click();
    cy.url().should("eq", "http://localhost:3001/quiz/");
  });

  it("Create quiz", () => {
    cy.getByData("toggle-create").contains("Create").click();
    cy.url().should("eq", "http://localhost:3001/quiz/create");
    cy.getByData("input-title").type("first quiz");
    cy.getByData("input-due").type("2023-03-30");

    cy.getByData("input-question").type("What color is this");
    cy.getByData("input-choice1").type("Red");
    cy.getByData("input-choice2").type("Blue");
    cy.getByData("input-choice3").type("Green");
    cy.getByData("toggle-choice1").click();
    cy.getByData("add-question").click();

    cy.getByData("save").contains("Save").click();
  });

  it("Edit quiz", () => {
    cy.getByData("quiz-card").first().click();
    cy.getByData("edit").contains("Edit").click();
    cy.getByData("input-title").type(" updated");
    cy.getByData("save").contains("Save").click();
  });

  it("Delete quiz", () => {
    cy.getByData("quiz-card").first().click();
    cy.getByData("delete").contains("Delete").click();
    cy.url().should("eq", "http://localhost:3001/quiz");
  });

  it("assign quiz", () => {
    cy.getByData("assign").contains("Assign").click();
    cy.getByData("toggle-quiz").contains("Quiz").click();

    cy.getByData("select-room").click();
    cy.get("#react-select-5-option-0").click();

    cy.getByData("select-quiz").click();
    cy.get("#react-select-7-option-0").click();

    cy.getByData("post-quiz").contains("Post").click();
    cy.get(".text-success").contains("Successfully posted");
  });
});
