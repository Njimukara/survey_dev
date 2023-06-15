export default describe("Dashboard Page ", () => {
  //   cy.visit("http://localhost:3000/signin");

  const User = {
    username: "njibrianclovis@gmail.com",
    password: "surveyplanner",
  };

  const pages = ["transactions", "generate", "profile"];

  const logInTheUser = (user: any) => {
    cy.get('[data-cy="login-email"]').type(user.username);
    cy.get('[data-cy="login-password"]').type(user.password);
    cy.get('[data-cy="login-button"]').click();
  };

  it("should display the dashboard after login", () => {
    cy.viewport(1300, 800);
    cy.visit("http://localhost:3000/auth/signin");
    logInTheUser(User);
    cy.wait(15000).then(() => {
      cy.url().should("include", "default");
      cy.get('[data-cy="dashboard-heading"]').should("contain", "Hello");
    });

    // check sidebar links
    // cy.get('[data-cy="sidebar-links"]').should("have.length", 4);
    // cy.get('[data-cy="sidebar-link"]').should("have.length", 1);
    // cy.get('[data-cy="sidebar-links"]').click({ multiple: true });

    let linkTextToMatch = "Profile";

    cy.get('[data-cy="sidebar-links"]').each((link) => {
      cy.wrap(link)
        .invoke("text")
        .then((text) => {
          if (text == linkTextToMatch) {
            cy.wrap(link).click().wait(60000);
          }
        });
    });

    cy.url()
      .should("contain", "profile")
      .then(() => {
        cy.get('[data-cy="edit-info"]').click().wait(15000);
      });
    cy.url().should("contain", "edit");

    cy.get('[data-cy="toggleEdit"]').click().then(()=> {
      cy.get('[data-cy="editName_input"]').type(User.username)
    })

  });

  // it("should display all users in a company", () => {
  //   cy.viewport(1300, 800);
  //   cy.visit("http://localhost:3000/auth/signin");
  //   logInTheUser(User);
  //   cy.wait(15000).then(() => {
  //     cy.url().should("include", "default");
  //     cy.get('[data-cy="dashboard-heading"]').should("contain", "Hello");
  //   });

  //   // check sidebar links
  //   // cy.get('[data-cy="sidebar-links"]').should("have.length", 4);
  //   // cy.get('[data-cy="sidebar-link"]').should("have.length", 1);
  //   cy.get('[data-cy="sidebar-links"]');

  //   cy.wait(10000);

  //   cy.url()
  //     .should("contain", "profile")
  //     .then(() => {
  //       cy.get('[data-cy="edit-info"]').click().wait(10000);
  //     });
  //   cy.url().should("contain", "edit");
  // });
});
