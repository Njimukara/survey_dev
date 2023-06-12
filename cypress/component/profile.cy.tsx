import Banner from "views/admin/profile/components/Banner";

describe("profile.cy.tsx", () => {
  const props = {
    avatar: "",
    name: "Njimukara",
    email: "njimukarabrian@gmail.com",
    date_joined: "24/2/2002",
  };

  it("playground", () => {
    cy.mount(
      <Banner
        avatar=""
        name="Njimukara"
        email="njimukarabrian@gmail.com"
        date_joined="24/2/2002"
      />
    );
  });
});
