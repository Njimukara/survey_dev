// cypress/integration/editCompanyPage.spec.js

export default describe("EditCompany Page", () => {
  beforeEach(() => {
    const email = "njibrianclovis@gmail.com";
    const password = "surveyplanner";
    cy.login(email, password);
    cy.wait(10000);

    // Visit the EditCompany page
    cy.visit("/company/edit-company");
  });

  it("should display the company details", () => {
    // Check if the page loads successfully
    cy.wait(10000);
    cy.contains("Company Details").should("be.visible");

    // Check if the input fields with company details are visible and contain the correct values
    cy.get("[data-cy=company-name-input]")
      .should("be.visible")
      .should("have.value", "Company Name");
    cy.get("[data-cy=country-select]").should("be.visible");
    cy.get("[data-cy=city-select]").should("be.visible");
    cy.get("[data-cy=state-input]")
      .should("be.visible")
      .should("have.value", "Nord-West");
    cy.get("[data-cy=zip-code-input]")
      .should("be.visible")
      .should("have.value", "912");
    cy.get("[data-cy=street-address-input]")
      .should("be.visible")
      .should("have.value", "Foncha Street");
  });

  it("should allow the user to edit company details", () => {
    cy.wait(10000);
    // Click on the "Edit" button
    cy.contains("Edit").click();

    // Check if the input fields become editable
    cy.get("[data-cy=company-name-input]").should("not.be.disabled");
    cy.get("[data-cy=country-select]").should("not.be.disabled");
    cy.get("[data-cy=city-select]").should("not.be.disabled");
    cy.get("[data-cy=state-input]").should("not.be.disabled");
    cy.get("[data-cy=zip-code-input]").should("not.be.disabled");
    cy.get("[data-cy=street-address-input]").should("not.be.disabled");

    // Edit the company name
    cy.get("[data-cy=company-name-input]").clear().type("Updated Company");

    // Select a different country
    cy.get("select").select("France");
    cy.get("[data-cy=country-select]").click();
    cy.get(".css-1fjvxrx").contains("Canada").click();

    // Select a different city
    cy.get("[data-cy=city-select]").click();
    cy.get(".css-1fjvxrx").contains("Toronto").click();

    // Edit the state
    cy.get("[data-cy=state-input]").clear().type("Ontario");

    // Edit the zip code
    cy.get("[data-cy=zip-code-input]").clear().type("67890");

    // Edit the street address
    cy.get("[data-cy=street-address-input]").clear().type("Updated Street 987");

    // Click on the "Save" button
    cy.contains("Save").click();

    // Check if the company details are updated and the "Edit" button is visible again
    cy.contains("Company Details").should("be.visible");
    cy.get("[data-cy=company-name-input]")
      .should("be.disabled")
      .should("have.value", "Updated Company");
    cy.get("[data-cy=country-select]").should("be.visible");
    cy.get("[data-cy=city-select]").should("be.visible");
    cy.get("[data-cy=state-input]")
      .should("be.visible")
      .should("have.value", "Ontario");
    cy.get("[data-cy=zip-code-input]")
      .should("be.visible")
      .should("have.value", "67890");
    cy.get("[data-cy=street-address-input]")
      .should("be.visible")
      .should("have.value", "Updated Street 987");
  });

  // it("should display an error message if the company update fails", () => {
  //   // Click on the "Edit" button
  //   cy.contains("Edit").click();

  //   // Edit the company name (assume invalid data that will cause the update to fail)
  //   cy.get("[data-cy=company-name-input]").clear().type("Invalid Company Name");

  //   // Click on the "Save" button
  //   cy.contains("Save").click();

  //   // Check if the error message is displayed
  //   cy.contains("Company update failed").should("be.visible");
  // });

  //   it("should not display the company details and prevent modification if the user is not a company owner", () => {
  //     // Mock the user session to have a different role (e.g., regular user)
  //     cy.intercept("*/api/company/my-company", { fixture: "regularUser.json" }); // Replace with your fixture file for regular user

  //     // Reload the page after mocking the user session
  //     cy.reload();

  //     // Check if the page displays a message indicating the user is not authorized
  //     cy.contains("You are not authorized to edit this company.").should("be.visible");

  //     // Check if the input fields are not visible (as the user is not authorized to edit)
  //     // ... (add assertions to check input fields are not visible)

  //     // Check if the "Edit" button is not visible (as the user is not authorized to edit)
  //     cy.contains("Edit").should("not.exist");

  //     // Try to modify the input fields (if they are not disabled)
  //     // ... (add assertions to check if input fields are disabled)

  //     // Try to click on the "Save" button (if it's visible)
  //     // ... (add assertions to check if "Save" button is not visible)

  //     // Optionally, you can also check if the page redirects to a different page (e.g., home) after showing the error message
  //     // ... (add assertions to check if the redirection happens)
  //   });
});
