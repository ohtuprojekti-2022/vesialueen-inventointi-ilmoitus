import { slowCypressDown } from "cypress-slow-down"

describe('Sending a new inventory report', () => {
    beforeEach(() => {
        cy.resetDatabase()
        cy.visit('/')
        // Check that there's no inventory shown on the front page yet
        cy.get('table').should('not.contain', 'Cypress Tester')
    })

    it('User can view the details of a successfully added inventory report', () => {
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
        // Set the inventory details
        cy.get('#inventorydate').type('2021-11-20')
        cy.get('[data-testid="dive"]').click()
        cy.get('[data-testid="visibility"]').select('good')
        cy.get('[data-testid="moreInfo"]').type('ei löytynyt mitään')
        cy.get('[data-testid="name"]').type('Cypress Tester')
        cy.get('[data-testid="email"]').type('cypress@test.mail')
        cy.get('[data-testid="phone"]').type('+1234567890')
        cy.get('[data-testid="terms-of-services"]').check()
        cy.get('[data-testid="submit"]').click()
        // User should be redirected to the report's page
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

        // Check that the sent report is shown in the list on the front page
        cy.navigateToFrontpage()
        cy.get('table').contains('td', '20.11.2021')
        cy.get('table').contains('td', 'Sukellus')
        cy.get('table').contains('td', 'Cypress Tester')
    })

    it('Logged-in user can view the successfully added report on the user page', () => {
        const user = {
            username: 'cypress_tester',
            password: 'password123',
            email: 'cypress@test.mail',
            phone: '+358989898989',
            name: 'Cypress Tester'
        }
        cy.registerUser(user)
        cy.loginWith(user.username, user.password)

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
        cy.get('#inventorydate').type('2020-05-18')
        cy.get('[data-testid="other"]').click()
        cy.get('[data-testid="methodInfo"]').type('Test method')
        cy.get('[data-testid="terms-of-services"]').check()
        cy.get('[data-testid="submit"]').click()
        // Should be redirected to the report's page
        cy.url().should('include', '/report/')
        // Check that the sent report is shown in user's own inventories
        cy.navigateToUserPage()
        cy.get('[data-testid="own-inventories"]').click()
        cy.get('table').contains('td', '18.05.2020')
        cy.get('table').contains('td', 'Test method')
        cy.get('table').contains('td', 'Cypress Tester').should('not.exist')
    })

})