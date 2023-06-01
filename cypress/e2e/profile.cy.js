// import Hero from "../../src/layouts/home/Hero";
describe("Profile Page ", () => {
  //   cy.visit("http://localhost:3000/signin");

  const User = {
    username: "njibrianclovis@gmail.com",
    password: "surveyplanner",
  };
  const logInTheUser = (user) => {
    cy.get('[data-cy="login-email"]').type(user.username);
    cy.get('[data-cy="login-password"]').type(user.password);
    cy.get('[data-cy="login-button"]').click();
  };
  //   beforeEach("Go to Login page", () => {});

  it("should display the profile page after login", () => {
    cy.visit("http://localhost:3000/auth/signin");
    logInTheUser(User);
    cy.wait(5000).then(() => {
      cy.visit("http://localhost:3000/admin/profile");
      cy.get('[data-cy="user-name"]').then((value) => {
        console.log(value);
      });
    });
    // cy.url().should("include", "default");
    // cy.mount(<Hero />);

    // cy.get('data-cy="welcome-text"').should(
    //   "have.string",
    //   "hydrographic surveys"
    // );
    // cy.get('data-cy="login-button').click();
    // cy.url().should("to.match", /^signin/);
  });
});
