export default describe("Reset Password Page", () => {
  const email = "njibrianclovis@gmail.com";

  beforeEach(() => {
    // Visit the Reset Password page
    cy.visit("/auth/reset-password");
  });

  it("should display the reset password form", () => {
    // Check if the page loads successfully
    cy.contains("Forgot Password").should("be.visible");
    cy.contains("No Worries, We'll send you reset instructions").should(
      "be.visible"
    );
    cy.contains("Email").should("be.visible");
    cy.contains("Reset password").should("be.visible");
    cy.contains("Back to Login").should("be.visible");

    // Check if the input field is visible
    cy.get("input[name=email]").should("be.visible");
  });

  it("should show error message for invalid email", () => {
    // Enter an invalid email
    cy.get("input[name=email]").type("invalidemail");

    // Click on the "Reset password" button
    cy.get("button[type=submit]").click();

    // Check if error message is displayed
    cy.contains("Email is Invalid").should("be.visible");
  });

  it("should submit the email for password reset on successful submission", () => {
    // Stub the API request for password reset
    cy.intercept("POST", "/auth/users/reset_password/").as("passwordReset");

    // Enter a valid email
    cy.get("input[name=email]").type(email);

    // Click on the "Reset password" button
    cy.get("button[type=submit]").click();

    // Check if the API request is sent
    cy.wait("@passwordReset");

    // Check if the user is redirected to the verify email page
    cy.url().should("include", "/auth/verifyemail");
  });

  it("should show error message on password reset failure", () => {
    // Stub the API request for password reset with an error response
    cy.intercept("POST", "/auth/users/reset_password/", {
      statusCode: 400,
      body: {
        email: ["This user does not exist"],
      },
    }).as("passwordReset");

    // Enter a valid email
    cy.get("input[name=email]").type(email);

    // Click on the "Reset password" button
    cy.get("button[type=submit]").click();

    // Check if the API request is sent
    cy.wait("@passwordReset");

    // Check if error message is displayed
    cy.contains("This user does not exist").should("be.visible");
  });

  it("should disable the 'Reset password' button during submission", () => {
    // Stub the API request for password reset
    cy.intercept("POST", "/auth/users/reset_password/").as("passwordReset");

    // Enter a valid email
    cy.get("input[name=email]").type(email);

    // Click on the "Reset password" button
    cy.get("button[type=submit]").click();

    // Check if the "Reset password" button is disabled
    cy.get("button[type=submit]").should("be.disabled");

    // Wait for the API request to complete
    cy.wait("@passwordReset");

    // Check if the "Reset password" button is enabled again after successful submission
    cy.get("button[type=submit]").should("be.enabled");
  });

  it("should redirect to the login page when 'Back to Login' is clicked", () => {
    // Click on the "Back to Login" button
    cy.get("a[href='/auth/signin']").click();

    // Check if the user is redirected to the login page
    cy.url().should("include", "/auth/signin");
  });
});
