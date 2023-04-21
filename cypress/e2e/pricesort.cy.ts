describe ('Testing that sort by price works', () => {
  it('Sorting by price for the restaurants', () => {

    cy.visit('http://localhost:3000')

    //attempt to create an account
    cy.contains('Log In').click()
    cy.get('input[placeholder="nomnoms@gmail.com"]').type('rpjagana@gmail.com')
    cy.get('input[placeholder="Your password"]').type('ruchitha')
    cy.contains('Login').click()
    cy.wait(4000)
    cy.contains('Your Tables').should('exist')
    cy.url().should('include', '/tables')

      // test table creation and joining
  cy.contains('Create').click()
  cy.get('input[placeholder="Table Name"]').type('cypresstable')
  cy.get('input[placeholder="Zip Code"]').type('47906')
  cy.get('input[placeholder="Event Description"]').type('automated testing')
  cy.get('span.mantine-qo1k2.mantine-Button-label').contains('Create').click()
  cy.wait(5000)
  cy.get('body').type('{esc}')
  cy.get(':contains("Join"):last').click()
  cy.wait(5000)
  // assert table joining is successful
  cy.contains('Table Name:').should('exist')
  cy.contains('Sort By').click()
  cy.contains('Price').click()
})
})