export default describe("Dashboard Page ", () => {
  //   cy.visit("http://localhost:3000/signin");

  const User = {
    username: "njibrianclovis@gmail.com",
    password: "surveyplanner",
  };
  const logInTheUser = (user: any) => {
    cy.get('[data-cy="login-email"]').type(user.username);
    cy.get('[data-cy="login-password"]').type(user.password);
    cy.get('[data-cy="login-button"]').click();
  };
  //   beforeEach("Go to Login page", () => {});

  it("should display the dashboard after login", () => {
    cy.visit("http://localhost:3000/auth/signin");
    logInTheUser(User);
    cy.url().should("include", "default");
    cy.get('[data-cy="dashboard-heading"]').should("include", "Hello");

    // cy.get('data-cy="welcome-text"').should(
    //   "have.string",
    //   "hydrographic surveys"
    // );
    // cy.get('data-cy="login-button').click();
    // cy.url().should("to.match", /^signin/);
  });
});
