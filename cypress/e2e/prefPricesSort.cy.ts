export{}
describe('Preferences Page Prices Select', () => {
  it('Sorting by Price Select', () => {
    // visit app homepage
    cy.visit('http://localhost:3000/auth/login')
    
    // attempt to log in as guest  
    cy.get('input[placeholder="nomnoms@gmail.com"]').type('johniscool2833@gmail.com')
    cy.get('input[placeholder="Your password"]').type('Hello@123')
    cy.contains('Login').click()
    // assert login is successful
    cy.url().should('include', '/tables')
    cy.get(':contains("Join"):last').click()
    cy.get('.sort-button').click()  
    cy.contains('Price').click();
    cy.get('.sort-click').click();
    if (cy.contains("$$$$").should("exist") || cy.contains("").should("exist"))   
    cy.get('.sort-click').click();
    cy.contains("$").should("exist")
  })
})