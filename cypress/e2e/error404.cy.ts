describe('Not found', () => {
  it('routes not found', () => {
    cy.visit('/notFound');
    cy.get('img').should('have.attr', 'alt', 'Page not found');
  });
});
