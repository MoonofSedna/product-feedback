/// <reference types="Cypress" />

describe("<AddFeedBack/>", () => {
  it("<AddFeedBack/> - Verify that it's the correct page and that the form work properly", () => {
    // Verify page

    cy.visit("/add-feedback");

    // Verify title

    cy.contains("Create a New Feedback");

    // Verify form

    cy.get("[data-cy=submit-feedback]")
      .should("exist")
      .should("have.text", "Add Feedback")
      .click();
    cy.get("[data-cy=form-error]").should("exist");

    // Input data

    cy.get('[name="title"]').should("exist").type("Test Title");

    cy.get("[data-cy=category] .dropdown-toggle")
      .should("exist")
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

    cy.get('[name="description"]').should("exist").type("Test description");

    cy.get('[name="description"]').clear();

    cy.get('[name="description"]').type("Test");

    cy.get("[data-cy=submit-feedback]").click();

    cy.get('[name="description"]').type("Test description");

    cy.get("[data-cy=submit-feedback]").click();

    // Verify that the feedback is added

    cy.get("[data-cy=feedback-title]").should("exist").contains("Test Title");
  });
});
