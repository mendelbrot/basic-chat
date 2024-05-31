describe("Sending a chat message", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get("input[data-cy=username-input]").type("user1");
    cy.get("input[data-cy=password-input]").type("password");
    cy.get("button[data-cy=login-button]").click();
  })

  it("Should allow the user to send a message and see the message they sent", () => {
    cy.get('textarea[data-cy=message-input]').type("Hello from user1!")
    cy.get('button[data-cy=send-message-button]').click()

    cy.get("ul li:last span").contains("Hello from user1!");
  });
});