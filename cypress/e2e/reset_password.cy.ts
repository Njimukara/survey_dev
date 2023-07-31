export default describe("SetPassword Page", () => {
  beforeEach(() => {
    // Visit the SetPassword page
    cy.visit("/password/reset/confirm/fdf");
    cy.wait(2000);
  });

  it("should display the password reset form", () => {
    // Check if the page loads successfully
    cy.contains("Forgot Password").should("be.visible");
    cy.contains(
      "Your new password must be different from the previous one."
    ).should("be.visible");
    cy.contains("Password").should("be.visible");
    cy.contains("Confirm Password").should("be.visible");
    cy.contains("Reset password").should("be.visible");
    cy.contains("Back to Login").should("be.visible");

    // Check if the input fields are visible
    cy.get("input[name=password]").should("be.visible");
    cy.get("input[name=confirmPassword]").should("be.visible");
  });

  it("should show error messages for invalid input", () => {
    // Enter invalid password and confirm password (less than 8 characters)
    cy.get("input[name=password]").type("123");
    cy.get("input[name=confirmPassword]").type("123fdf");

    // Click on the "Reset password" button
    cy.get("button[type=submit]").click();

    // Check if error messages are displayed
    cy.contains("Min of 8 characters required").should("be.visible");
    cy.contains("Passwords don't match").should("be.visible");
  });

  // it("should reset the password on successful submission", () => {
  //   // Stub the API request for password reset
  //   cy.intercept("POST", "/auth/users/reset_password_confirm/").as(
  //     "passwordReset"
  //   );

  //   // Enter valid password and confirm password
  //   cy.get("input[name=password]").type("newPassword123");
  //   cy.get("input[name=confirmPassword]").type("newPassword123");

  //   // Click on the "Reset password" button
  //   cy.get("button[type=submit]").click();

  //   // Check if the API request is sent
  //   cy.wait("@passwordReset").its("response.statusCode").should("eq", 200);

  //   // Check if the user is redirected to the login page after successful reset
  //   cy.url().should("include", "/auth/signin");

  //   // Check if success toast is displayed
  //   cy.contains("Password reset successful").should("be.visible");
  // });

  it("should show error toast on password reset failure", () => {
    // Stub the API request for password reset with an error response
    cy.intercept("POST", "/auth/users/reset_password_confirm/", {
      statusCode: 400,
      body: {
        token: ["Invalid token"],
      },
    }).as("passwordReset");

    // Enter valid password and confirm password
    cy.get("input[name=password]").type("newPassword123");
    cy.get("input[name=confirmPassword]").type("newPassword123");

    // Click on the "Reset password" button
    cy.get("button[type=submit]").click();

    // Check if the API request is sent
    cy.wait("@passwordReset").its("response.statusCode").should("eq", 400);

    // Check if error toast is displayed
    cy.contains("Password reset failed").should("be.visible");
    cy.contains("Invalid token").should("be.visible");
  });

  it("should toggle password visibility", () => {
    // Check if the password input is of type "password"
    cy.get("input[name=password]").should("have.attr", "type", "password");

    // Click on the eye icon to toggle password visibility
    cy.get('[data-testid="toggle-password-visibility"]').click();

    // Check if the password input is now of type "text" (visible)
    cy.get("input[name=password]").should("have.attr", "type", "text");

    // Click on the eye icon again to toggle password visibility
    cy.get('[data-testid="toggle-password-visibility"]').click();

    // Check if the password input is now of type "password" (hidden)
    cy.get("input[name=password]").should("have.attr", "type", "password");
  });
});
