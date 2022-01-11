/// <reference types="Cypress" />

describe("<SuggestionsFilter/>", () => {
  it("<SuggestionsFilter/> - Verify that suggestions filter work propertly", () => {
    // visit home page
    cy.visit("/");

    // Verify that the list exist

    cy.get("[data-cy=suggestion-list]").should("exist");

    // Sort suggestions

    cy.get("[data-cy=sort-by] .dropdown-toggle")
      .should("exist")
      .click()
      .then(() => {
        cy.get("[data-cy=sort-by] .dropdown-menu .dropdown-item")
          .should("exist")
          .each(($item) => {
            cy.wrap($item).click();
            cy.get("[data-cy=sort-by] .dropdown-toggle")
              .should("exist")
              .click();
          });
      });

    // Add votes

    cy.get("[data-cy=vote-button]")
      .should("exist")
      .each(($item) => {
        cy.wrap($item).click();
      });

    // Filter suggestions

    cy.get("[data-cy=filter-by] button")
      .should("exist")
      .each(($item) => {
        cy.wrap($item).click();
      });
  });
});
