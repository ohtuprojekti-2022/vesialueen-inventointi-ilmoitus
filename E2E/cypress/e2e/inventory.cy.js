import { slowCypressDown } from "cypress-slow-down"

describe('New inventory report', () => {
    beforeEach(() => {
        cy.resetDatabase()
        cy.visit('/')
    })

    it('User can view the details of a successfully added inventory report', () => {
        // Check that there's no inventory in the list yet
        cy.get('table').should('not.contain', 'Cypress Tester')

        cy.navigateToNewInventoryForm()

        // Draw a polygon
        cy.get('.leaflet-draw-draw-polygon').click()
        slowCypressDown(100)
        cy.get('.leaflet-container')
            .click(180, 100)
            .click(180, 50)
            .click(150, 70)
            .click(180, 100)
        slowCypressDown(false)
        // Set inventory details
        cy.get('#inventorydate').type('2021-11-20')
        cy.get('[data-testid="dive"]').click()
        cy.get('[data-testid="visibility"]').select('good')
        cy.get('[data-testid="moreInfo"]').type('ei löytynyt mitään')
        cy.get('[data-testid="name"]').type('Cypress Tester')
        cy.get('[data-testid="email"]').type('cypress@test.mail')
        cy.get('[data-testid="phone"]').type('+1234567890')
        cy.get('[data-testid="submit"]').click()

        cy.url().should('include', '/report/')
        // Check that the report page has correct details
        cy.contains('Päivämäärä: 20.11.2021')
        cy.contains('Tapa: Sukellus')
        cy.contains('Näkyvyys: hyvä')
        cy.contains('ei löytynyt mitään')

        // Assertions to be added
        //cy.contains('Cypress Tester')
        //cy.contains('cypress@test.mail').should('not.exist')
        //cy.contains('+1234567890').should('not.exist')

        cy.navigateToFrontpage()

        // Check that the added inventory is in the list
        cy.get('table').contains('td', '20.11.2021')
        cy.get('table').contains('td', 'Sukellus')
        cy.get('table').contains('td', 'Cypress Tester')
    })

})