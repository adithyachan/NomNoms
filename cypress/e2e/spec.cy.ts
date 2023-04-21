describe('Login Test', () => {
  it('Logs in as guest', () => {
    // visit app homepage
    cy.visit('http://localhost:3000')
    
    // attempt to log in as guest
    cy.contains('Log In').click()    
    cy.contains('Continue as Guest').click()
    cy.get('input[placeholder="SpicyBurrito"]').type('automatedtestuser')
    cy.contains('NomNom!').click()
    // assert login is successful
    cy.url().should('include', '/tables')

    // test table creation and joining
    cy.contains('Create').click()
    cy.get('input[placeholder="Table Name"]').type('cypresstable')
    cy.get('input[placeholder="Zip Code"]').type('95014')
    cy.get('input[placeholder="Event Description"]').type('this table is used for automated testing')
    cy.get('span.mantine-qo1k2.mantine-Button-label').contains('Create').click()
    cy.wait(7000)
    cy.get('body').type('{esc}')
    cy.get(':contains("Join"):last').click()
    cy.wait(5000)
    // assert table joining is successful
    cy.contains('Table Name:').should('exist')
    
  })
})

//This test case will only function on the first time purposefully because
//after the first time, the email would have already existed and won't be able
//to create an account
describe('Create an Account test', () => {
  it('Create an account', () => {
    //visit the app's homepage
    cy.visit('http://localhost:3000')

    //attempt to create an account
   cy.contains('Sign Up').click()
   cy.get('input[placeholder="nomnoms@gmail.com"]').type('ruchi_jag@gmail.com')
   cy.get('input[placeholder="SpicyBurrito"]').type('DeliciousTostada')
   cy.get('input[placeholder="Your password"]').type('thisismypassword')
   cy.get('input[placeholder="Confirm your password"]').type('thisismypassword')
   cy.get('input[type="checkbox"]').check()
   cy.contains('Register').click()
   cy.wait(6000)
   cy.contains('Awaiting Email Verification').should('exist')
  })
})

describe ('Sign in with existing account test', () => {
  it('Sign in with google', () => {
    //visit the app's homepage
    cy.visit('http://localhost:3000')

    //attempt to create an account
    cy.contains('Log In').click()
    cy.get('input[placeholder="nomnoms@gmail.com"]').type('rpjagana@gmail.com')
    cy.get('input[placeholder="Your password"]').type('ruchitha')
    cy.contains('Login').click()

  })
})
  