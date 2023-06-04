export default describe("Landing Page spec", () => {
  it("displays the langing page correctly", () => {
    cy.visit("http://localhost:3000");
    // cy.mount(<Home />);

    // cy.get('[data-cy="welcome-text"]').should(
    //   "include",
    //   "hydrographic surveys"
    // );
    // cy.get('[data-cy="login-button"]').click();
    // cy.url().should("include", "signin");
  });
});
