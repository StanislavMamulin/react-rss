describe('Main page e2e test', () => {
  it('should load the main page', () => {
    cy.visit('/about');

    cy.contains('Lorem ipsum dolor');
  });
});
