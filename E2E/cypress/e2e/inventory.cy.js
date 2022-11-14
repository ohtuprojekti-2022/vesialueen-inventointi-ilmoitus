import { slowCypressDown } from "cypress-slow-down"

describe('New inventory report', () => {
    beforeEach(() => {
        // Navigate to the inventory form
        cy.visit('/')
        cy.get('[data-testid="new-inventory"]').click()
        cy.shouldBeOnThePage('/inventointi-ilmoitus')
    })

    it('User can view succesfully added report on its own page', () => {
        cy.get('.leaflet-draw-draw-polygon').click()
        slowCypressDown(100)
        cy.get('.leaflet-container')
            .click(180, 100)
            .click(180, 50)
            .click(150, 70)
            .click(180, 100)
        slowCypressDown(false)

        cy.get('#inventorydate').type('2021-11-20')
        cy.get('[data-testid="dive"]').click()
        cy.get('[data-testid="visibility"]').select('good')
        cy.get('[data-testid="moreInfo"]').type('ei löytynyt mitään')
        cy.get('[data-testid="name"]').type('Cypress Tester')
        cy.get('[data-testid="email"]').type('cypress@test.mail')
        cy.get('[data-testid="phone"]').type('+1234567890')
        cy.get('[data-testid="submit"]').click()

        cy.url().should('include', '/report/')
        // TODO
        // check that the inventory's info is shown properly
        // navigate to front page
        // check that the added inventory is shown on the list
    })

})