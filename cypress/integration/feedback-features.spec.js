/// <reference types="Cypress" />

describe("<FeedbackFeatures/>", () => {
  it("<FeedbackFeatures/> - Verify that feedback's flow (vote, edit, delete) work correctly", () => {
    // visit the home page
    cy.visit("/");

    // Verify that the list exist

    cy.get("[data-cy=suggestion-list]").should("exist");

    // Click on the feedback title

    cy.get("[data-cy=feedback-title]").should("exist").first().click();

    // Verify URL

    cy.url().should("include", "/feedback/");

    // Add vote

    cy.get("[data-cy=vote-button]")
      .should("exist")
      .first()
      .should("exist")
      .click();

    // Verify that the vote is added

    cy.get("[data-cy=vote-button]").should("contain", 113);

    // Add a comment

    cy.get("[data-cy=comment-button]").click();
    cy.get("[data-cy=comment]").should("exist").type("Test comment");
    cy.get("[data-cy=comment-button]").click();

    // Add some replies

    cy.get("[data-cy=reply-toggle]").should("exist").first().click();
    cy.get("[data-cy=reply]").should("exist").type("Test reply");
    cy.get("[data-cy=reply-button]").click();

    cy.get("[data-cy=reply]").should("exist").type("Test reply 2");
    cy.get("[data-cy=reply-button]").click();

    cy.get("[data-cy=reply-to-reply]").should("exist").first().click();
    cy.get("[data-cy=reply]").should("exist").type("Test reply to reply 3");
    cy.get("[data-cy=reply-button]").click();
    cy.get("[data-cy=reply-to-reply]").should("exist").first().click();

    cy.get("[data-cy=reply-toggle]")
      .should("exist")
      .last()
      .should("exist")
      .click();
    cy.get("[data-cy=reply]").should("exist").type("Test reply to comment 2");
    cy.get("[data-cy=reply-button]").click();

    // Edit Feedback

    cy.get("[data-cy=edit-button]").should("exist").first().click();
    cy.get("[data-cy=submit-feedback]")
      .should("exist")
      .should("have.text", "Save Changes");

    // Change Feedback Values

    cy.get('[name="title"]').clear().type("Test Title");

    cy.get("[data-cy=category] .dropdown-toggle")
      .click()
      .then(() => {
        cy.get("[data-cy=category] .dropdown-menu .dropdown-item")
          .contains("Bug")
          .click();
        cy.get("[data-cy=category] .dropdown-toggle").click();
        cy.get("[data-cy=category] .dropdown-menu .dropdown-item")
          .contains("Feature")
          .click();
      });

    cy.get("[data-cy=status] .dropdown-toggle")
      .click()
      .then(() => {
        cy.get("[data-cy=status] .dropdown-menu .dropdown-item")
          .contains("Planned")
          .click();
        cy.get("[data-cy=status] .dropdown-toggle").click();
        cy.get("[data-cy=status] .dropdown-menu .dropdown-item")
          .contains("Live")
          .click();
      });

    cy.get('[name="description"]').type("Test description");

    cy.get('[name="description"]').clear();

    cy.get('[name="description"]').type("Test");

    cy.get("[data-cy=submit-feedback]").click();

    cy.get('[name="description"]').clear().type("Test description");

    cy.get("[data-cy=submit-feedback]").click();

    // Delete feedback

    cy.get("[data-cy=edit-button]").should("exist").first().click();
    cy.get("[data-cy=submit-feedback]")
      .should("exist")
      .should("have.text", "Save Changes");
    cy.get("[data-cy=delete-feedback]").should("exist").first().click();

    // Verify that the feedback is deleted

    cy.get("[data-cy=feedback-title]")
      .contains("Test Title")
      .should("not.exist");
  });
});
