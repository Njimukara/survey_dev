// signIn.spec.js
export default describe("Sign In Page", () => {
  beforeEach(() => {
    cy.visit("/company/invite");
  });

  it("should display the sign-up form correctly", () => {
    // Check if the form fields are visible
    cy.get('[data-cy="name"]').should("be.visible");
    cy.get('[data-cy="email"]').should("be.visible");
    cy.get('[data-cy="password"]').should("be.visible");
    cy.get('[data-cy="confirm-password"]').should("be.visible");
  });

  it("should display an error message if the form is submitted with invalid data", () => {
    // Fill in the form with invalid data
    cy.get("[data-cy=name]").type("A"); // Invalid name (less than 3 characters)
    cy.get("[data-cy=email]").type("invalidemail"); // Invalid email format
    cy.get("[data-cy=password]").type("123"); // Invalid password (less than 8 characters)
    cy.get("[data-cy=confirm-password]").type("4563dsdsdf"); // Passwords don't match
    cy.get("[data-cy=confirm-password]").blur();

    // Submit the form
    // cy.get("[data-cy=signup-button]").click();

    // Check if error messages are displayed for each field
    cy.get("[data-cy=name-error]").should("be.visible");
    cy.get("[data-cy=email-error]").should("be.visible");
    cy.get("[data-cy=password-error]").should("be.visible");
    cy.get("[data-cy=confirm-password-error]").should("be.visible");
  });

  // it("should display a success message if the form is submitted with valid data", () => {
  //   // Fill in the form with valid data
  //   cy.get("[data-cy=name]").type("John Doe");
  //   cy.get("[data-cy=email]").type("johndoe@example.com");
  //   cy.get("[data-cy=password]").type("password123");
  //   cy.get("[data-cy=confirm-password]").type("password123");

  //   // Submit the form
  //   cy.get("[data-cy=signup-button]").click();

  //   // Check if a success message is displayed
  //   cy.get("[data-cy=success-message]").should("be.visible");
  // });

  it("should show Google Sign-In option", () => {
    // Check if Google Sign-In button is visible
    cy.get("[data-cy=google-signin-button]").should("be.visible");
  });
});
