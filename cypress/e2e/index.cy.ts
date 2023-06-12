export default describe("Landing Page spec", () => {
  it("displays the langing page correctly", () => {
    cy.visit("/");

    cy.get("[data-cy=welcome-text]").should("contain", "surveys");

    cy.get("[data-cy=process-step]").should("contain", "simple 3-step process");

    cy.get('[data-cy="footer-info"]').should(
      "contain",
      "questions or assistance"
    );

    cy.wait(10000).then(() => {
      cy.get("[data-cy=pricing-plan-name]").should("have.length", 4);
    });

    cy.get('[data-cy="login-button"]').click();
    cy.wait(10000).then(() => {
      cy.url().should("include", "signin");
    });
  });
});
