//This test case will only function on the first time purposefully because
//after the first time, the email would have already existed and won't be able
//to create an account
describe('Create an Account test', () => {
  it('Create an account', () => {
    //visit the app's homepage
    cy.visit('http://localhost:3000')

    //attempt to create an account
   cy.contains('Sign Up').click()
   cy.get('input[placeholder="nomnoms@gmail.com"]').type('ruchi_purdue@gmail.com')
   cy.get('input[placeholder="SpicyBurrito"]').type('DeliciousTostada')
   cy.get('input[placeholder="Your password"]').type('thisismypassword')
   cy.get('input[placeholder="Confirm your password"]').type('thisismypassword')
   cy.get('input[type="checkbox"]').check()
   cy.contains('Register').click()
   cy.wait(6000)
   cy.contains('Awaiting Email Verification').should('exist')
  })
})