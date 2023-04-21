describe ('Sign in with existing account test', () => {
  it('Sign in with google', () => {
    //visit the app's homepage
    cy.visit('http://localhost:3000')

    //attempt to create an account
    cy.contains('Log In').click()
    cy.get('input[placeholder="nomnoms@gmail.com"]').type('rpjagana@gmail.com')
    cy.get('input[placeholder="Your password"]').type('ruchitha')
    cy.contains('Login').click()
    cy.wait(4000)
    cy.contains('Your Tables').should('exist')
    cy.url().should('include', '/tables')
  })
})