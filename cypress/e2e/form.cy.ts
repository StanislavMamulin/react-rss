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
      cy.get('form').contains(nowhereCountry.name).should('not.exist');
    });

    cy.contains(nowhereCountry.name).should('exist');
    cy.get('.card-wrapper').should('have.length', 2);
  });
  it('should not create a country with identical name', () => {
    cy.visit('/create');

    for (let i = 0; i < 2; i++) {
      cy.get('form').contains('Country name').type(nowhereCountry.name);
      cy.get('form').contains('Capital').type(nowhereCountry.capital);
      cy.get('form').contains('National day').type(nowhereCountry.day);
      cy.get('select').select(nowhereCountry.startOfWeek);
      cy.contains(nowhereCountry.continent).click();
      cy.contains(nowhereCountry.landlocked).click();
      cy.get('input[type="file"]').selectFile('./src/mocks/mockData/mockMoviePoster.jpg');

      cy.get('form').contains('Create').click();
    }

    cy.contains('A country with this name already exists, please introduce a new').should('exist');
  });
});
