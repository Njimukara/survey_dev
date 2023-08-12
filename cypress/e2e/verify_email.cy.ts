export default describe("Verify Email Page", () => {
  beforeEach(() => {
    cy.visit("/auth/verifyemail");
    cy.wait(5000);
  });

  it("should display the verify email message and button", () => {
    // Check if the page loads successfully
    cy.contains("You're almost there!").should("be.visible");
    cy.contains("A link has been sent to").should("be.visible");
    cy.contains("your email").should("be.visible");
    cy.contains("Follow it to activate your account").should("be.visible");
    cy.contains("Resend Link").should("be.visible");
    cy.contains("Back to Login").should("be.visible");
  });

  it("should open the default email server when 'your email' button is clicked", () => {
    // Stub the window.open() function to check if it is called with "mailto:"
    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen");
    });

    // Click on the "your email" button
    cy.contains("your email").click();

    // Check if the window.open() function is called with "mailto:"
    cy.get("@windowOpen").should("be.calledWith", "mailto:");
  });

  it("should redirect to the resend email page when 'Resend Link' button is clicked", () => {
    // Click on the "Resend Link" button
    cy.contains("Resend Link").click();

    // Check if the user is redirected to the resend email page
    cy.url().should("include", "/auth/resend-email");
  });

  it("should redirect to the login page when 'Back to Login' is clicked", () => {
    // Click on the "Back to Login" button
    cy.contains("Back to Login").click();

    // Check if the user is redirected to the login page
    cy.url().should("include", "/auth/signin");
  });
});
