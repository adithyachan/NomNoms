import { IconSortAscending } from "@tabler/icons-react"

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')

    cy.contains('Log In').click()  
    cy.wait(3000)  
    cy.get('input[placeholder="nomnoms@gmail.com"]').type('dhruvvdhawan@gmail.com')
    cy.get('input[placeholder="Your password"]').type('testnow')
    cy.contains('Login').click()
    cy.wait(3000)
    cy.url().should('include', '/tables')

    cy.wait(4000)
    cy.get(':contains("Join"):last').click()
    cy.contains('Table Name:').should('exist')
    cy.contains('Vote').click()
    cy.wait(5000)
    cy.get('.sort-by-select').click()
cy.contains('Lexicographically').click() 
let lex: any[] = []

for (let i = 0; i < 10; i++) {
  cy.get('.text-5xl').eq(0).invoke('text').then((text) => {
    lex[i] = text;
    cy.log(lex[i]);
  });
  cy.get('.yes').click();
  cy.wait(1000)
}

cy.wrap(lex).should('have.length', 10).then(() => {
  lex.sort((a, b) => a.localeCompare(b));
  cy.wait(5000)
  cy.get('.sort-ascending-btn').click()
  cy.wait(3000)

  for (let i = 0; i < 10; i++) {
    const lexes = lex[i]
    cy.contains(lexes).should('exist')
    cy.get('.yes').click()
    cy.wait(1000)
  }

  lex.sort((a, b) => b.localeCompare(a));
  cy.wait(5000)
  cy.get('.sort-descending-btn').click()
  cy.wait(3000)

  for (let i = 0; i < 10; i++) {
    const lexes = lex[i]
    cy.contains(lexes).should('exist')
    cy.get('.yes').click()
    cy.wait(1000)
  }

});


  })
})