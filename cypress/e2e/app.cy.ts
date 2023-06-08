describe('Main page e2e test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the main page', () => {
    cy.contains('Popular movies');
  });

  it('should do search', () => {
    cy.get('input').type('lord{enter}');

    cy.get('.card-wrapper').should('have.length', 20);
  });

  it('should show movie details', () => {
    cy.contains('Avatar').click();
    cy.contains('Release date: 2002-12-18').should('exist');
  });

  it('should close modal window', () => {
    cy.contains('Avatar').click();
    cy.contains('Release date: 2002-12-18').should('exist');
    cy.get('button').contains('✖').click();
    cy.contains('Release date: 2002-12-18').should('not.exist');
  });
});
