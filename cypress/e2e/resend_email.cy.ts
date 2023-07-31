export default describe("Resend Email Page", () => {
  const email = "njibrianclovis@gmail.com";

  beforeEach(() => {
    // Visit the Resend Email page
    cy.visit("/auth/resend-email");
    cy.wait(5000);
  });

  it("should display the email resend form", () => {
    // Check if the page loads successfully
    cy.contains("Input the email you used to register").should("be.visible");
    cy.contains("Resend Link").should("be.visible");
    cy.contains("Cancel").should("be.visible");

    // Check if the input field is visible
    cy.get("input[name=email]").should("be.visible");
  });

  it("should show error message for invalid email", () => {
    // Enter an invalid email
    cy.get("input[name=email]").type("invalidemail");

    // Click on the "Resend Link" button
    cy.get("button[type=submit]").click();

    // Check if error message is displayed
    cy.contains("Email is invalid").should("be.visible");
  });

  // it("should resend the email on successful submission", () => {
  //   // Stub the API request for email resend
  //   cy.intercept("POST", "/auth/users/resend_activation/").as("emailResend");

  //   // Enter a valid email
  //   cy.get("input[name=email]").type(email);

  //   // Click on the "Resend Link" button
  //   cy.get("button[type=submit]").click();

  //   // Check if the API request is sent
  //   cy.wait("@emailResend");

  //   // Check if success message is displayed
  //   cy.contains("Please wait").should("be.visible");
  // });

  it("should show error message on email resend failure", () => {
    // Stub the API request for email resend with an error response
    cy.intercept("POST", "/auth/users/resend_activation/", {
      statusCode: 400,
      body: {
        email: ["This user already has an account"],
      },
    }).as("emailResend");

    // Enter a valid email
    cy.get("input[name=email]").type(email);

    // Click on the "Resend Link" button
    cy.get("button[type=submit]").click();

    // Check if the API request is sent
    cy.wait("@emailResend");

    // Check if error message is displayed
    cy.contains("This user already has an account").should("be.visible");
  });

  it("should disable the 'Resend Link' button after submission", () => {
    // Stub the API request for email resend
    cy.intercept("POST", "/auth/users/resend_activation/").as("emailResend");

    // Enter a valid email
    cy.get("input[name=email]").type(email);
    // Click on the "Resend Link" button
    cy.get("button[type=submit]").click();

    // Check if the "Resend Link" button is disabled
    cy.get("button[type=submit]").should("be.disabled");

    // Wait for the API request to complete
    cy.wait("@emailResend");

    // Check if the "Resend Link" button is enabled again after successful submission
    cy.get("button[type=submit]").should("be.enabled");
  });

  it("should redirect to the login page when 'Cancel' is clicked", () => {
    // Click on the "Cancel" button
    cy.get("button[data-testid=cancel-button]").click();

    // Check if the user is redirected to the login page
    cy.url().should("include", "/auth/signin");
  });
});
