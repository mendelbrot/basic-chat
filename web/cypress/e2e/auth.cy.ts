describe("User Login", () => {
  it("Should display the login form at the homepage when the user isn't logged in", () => {
    cy.visit("http://localhost:3000/");

    cy.get("input[data-cy=username-input]").should("exist");
    cy.get("input[data-cy=password-input]").should("exist");
  });

  it("Should allow the user to login and see the chat page", () => {
    cy.visit("http://localhost:3000/");

    cy.get("input[data-cy=username-input]").type("user1");
    cy.get("input[data-cy=password-input]").type("password");
    cy.get("button[data-cy=login-button]").click();

    cy.get("h1").contains("Chat");
    cy.get('textarea[data-cy=message-input]').should('exist')
    cy.get('button[data-cy=send-message-button]').should('exist')
  });
});
