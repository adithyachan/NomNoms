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
cy.contains('Price').click() 
let prices: any[] = []

for (let i = 0; i < 10; i++) {
  cy.get('.PriceStr').eq(0).invoke('text').then((text) => {
    prices[i] = text;
    cy.log(prices[i]);
  });
  cy.get('.yes').click();
  cy.wait(1000)
}

cy.wrap(prices).should('have.length', 10).then(() => {
  prices.sort((a, b) => a.length - b.length);
  cy.wait(5000)
  cy.get('.sort-ascending-btn').click()
  cy.wait(3000)

  for (let i = 0; i < 10; i++) {
    const price = prices[i]
    cy.contains(price).should('exist')
    cy.get('.yes').click()
    cy.wait(1000)
  }

  prices.sort((a, b) => b.length - a.length);
  cy.wait(5000)
  cy.get('.sort-descending-btn').click()
  cy.wait(3000)

  for (let i = 0; i < 10; i++) {
    const price = prices[i]
    cy.contains(price).should('exist')
    cy.get('.yes').click()
    cy.wait(1000)
  }

});


  })
})