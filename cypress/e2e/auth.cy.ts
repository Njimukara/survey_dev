export default describe("Login Page", () => {
  //   before(() => {
  //     cy.log(`Visiting http://localhost:3000`);
  //     cy.visit("http://localhost:3000");
  //   });

  const User = {
    // nonUser: {
    //   username: "",
    //   password: "",
    // },
    user1: {
      username: "njibrianclovi@gmail.com",
      password: "surveyplanner",
    },
    user3: {
      username: "njibrianclovis@gmail.com",
      password: "surveyplanner",
    },
    user4: {
      username: "njibrianclovis@gmail.com",
      password: "surveyplanner",
    },
    user5: {
      name: "njimukara",
      phoneNumber: "+2343313213",
      email: "njibrianclovis@gmail.com",
      password: "12345667",
      confirmPassword: "12345",
    },
    user6: {
      name: "njimukara",
      phoneNumber: "+2343313213",
      email: "njimukara@gmail.com",
      password: "12345667",
      confirmPassword: "12345667",
    },
  };
  const logInTheUser = (user: any) => {
    cy.get('[data-cy="login-email"]').type(user.username);
    cy.get('[data-cy="login-password"]').type(user.password);
    cy.get('[data-cy="login-button"]').click();
  };

  const registerUser = (user: any) => {
    cy.get('[data-cy="register-name"]').type(user.name);
    cy.get('[data-cy="register-email"]').type(user.email);
    cy.get('[data-cy="register-phonenumber"]').type(user.phoneNumber);
    cy.get('[data-cy="register-password"]').type(user.password);
    cy.get('[data-cy="register-confirmpassword"]').type(user.confirmPassword);
    cy.get('[data-cy="register-button"]').click();
  };
  //

  // it("should show validation message when leaving fields blank on login", () => {
  //   cy.visit("http://localhost:3000/auth/signin");
  //   cy.get('[data-cy="login-state"]').contains("Hello!");
  //   logInTheUser();
  //   cy.get('[data-cy="login-error"]').should("exist");
  // });

  it("should show validation message with incorrext credentials", () => {
    cy.visit("http://localhost:3000/auth/signin");
    cy.get('[data-cy="login-state"]').contains("Hello!");
    logInTheUser(User.user1);
    cy.get('[data-cy="login-error"]').should("exist");
  });

  it("should login successfully and route to the dashboard", () => {
    cy.visit("http://localhost:3000/auth/signin");
    cy.get('[data-cy="login-state"]').contains("Hello!");
    logInTheUser(User.user3);
    cy.get('[data-cy="login-error"]').should("not.exist");
    // cy.url().should("include", "default");
  });

  it("route to the forgot password page", () => {
    cy.visit("http://localhost:3000/auth/signin");
    cy.get('[data-cy="login-state"]').contains("Hello!");
    cy.get('[data-cy="reset-password"]').click();
    cy.url().should("include", "reset-password");
  });

  it("should show validation message when leaving fields blank on registration", () => {
    cy.visit("http://localhost:3000/auth/signin");
    cy.get('[data-cy="toggle-register"]').click();
    cy.get('[data-cy="login-state"]').contains("Welcome");
    cy.get('[data-cy="register-button"]').click();
    cy.get('[data-cy="register-name-error"]').should("exist");
    cy.get('[data-cy="register-email-error"]').should("exist");
    cy.get('[data-cy="register-phonenumber-error"]').should("exist");
    cy.get('[data-cy="register-password-error"]').should("exist");
    cy.get('[data-cy="register-confirmpassword-error"]').should("exist");
  });

  it("should show validation message with wrong registration", () => {
    cy.visit("http://localhost:3000/auth/signin");
    cy.get('[data-cy="toggle-register"]').click();
    cy.get('[data-cy="login-state"]').contains("Welcome");
    registerUser(User.user5);
    cy.get('[data-cy="register-confirmpassword-error"]').should("exist");
  });

  it("should register successfully and route to the email confirmation page", () => {
    cy.visit("http://localhost:3000/auth/signin");
    cy.get('[data-cy="toggle-register"]').click();
    cy.get('[data-cy="login-state"]').contains("Welcome");
    registerUser(User.user6);
    // cy.url().should("include", "verifyemail");
    // after clicking, no input validation should appear
    cy.get('[data-cy="register-name-error"]').should("not.exist");
    cy.get('[data-cy="register-email-error"]').should("not.exist");
    cy.get('[data-cy="register-phonenumber-error"]').should("not.exist");
    cy.get('[data-cy="register-password-error"]').should("not.exist");
    cy.get('[data-cy="register-confirmpassword-error"]').should("not.exist");
    // cy.url().should("match", /^default/);
  });
});
