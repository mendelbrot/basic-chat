describe("Navigation", () => {
  it("should navigate to the signin page", () => {
    cy.visit("http://localhost:3000/");
    cy.get('a[href*="signin"]').click();
    cy.url().should("include", "/signin");
    cy.get("h1").contains("Sign In Page");
  });
});