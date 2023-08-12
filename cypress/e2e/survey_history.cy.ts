export default describe("SurveyHistory Component", () => {
  beforeEach(() => {
    const email = "njibrianclovis@gmail.com";
    const password = "surveyplanner";
    cy.login(email, password);
  });

  it("should render login page when session is absent", () => {
    cy.wait(10000);

    cy.visit("/admin/survey-history");
    cy.intercept("GET", "/api/auth/session", { fixture: "sessionNull.json" });

    // Assert that the survey history table is visible
    cy.url().should("include", "/auth/signin");
  });

  it("should render survey history table if there is data", () => {
    cy.wait(10000);
    cy.visit("/admin/survey-history");
    cy.wait(20000);

    // Assert that the survey history table is visible
    cy.get('[data-testid="survey-history-table"]').should("be.visible");
  });

  it("should render 'No Survey History' message if there is no data", () => {
    cy.wait(10000);

    // Mock session to return user data
    cy.visit("/admin/survey-history");
    cy.intercept("GET", "/api/auth/session", { fixture: "session.json" });

    // Assert that the 'No Survey History' message is visible
    cy.contains("No Survey History").should("be.visible");
  });
});
