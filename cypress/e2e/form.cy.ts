import { mockCountries, nowhereCountry } from '../../src/mocks/mockData/fantasyCountry';

describe('create countries e2e  test', () => {
  it('should visit countries page', () => {
    cy.visit('/create');
  });

  it('should create a country', () => {
    cy.visit('/create');

    mockCountries.forEach((country) => {
      cy.get('form').contains('Country name').type(country.name);
      cy.get('form').contains('Capital').type(country.capital);
      cy.get('form').contains('National day').type(country.day);
      cy.get('select').select(country.startOfWeek);
      cy.contains(country.continent).click();
      cy.contains(country.landlocked).click();
      cy.get('input[type="file"]').selectFile('./src/mocks/mockData/mockMoviePoster.jpg');

      cy.get('form').contains('Create').click();
    });

    cy.contains(nowhereCountry.name).should('exist');
    cy.get('.card-wrapper').should('have.length', 2);
  });
});
