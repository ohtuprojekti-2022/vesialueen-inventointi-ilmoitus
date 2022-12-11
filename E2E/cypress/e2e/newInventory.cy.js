describe('Sending a new inventory report', () => {
    beforeEach(() => {
        cy.resetDatabase()
        cy.visit('/')
        // Check that there's no inventory shown on the front page
        cy.contains('Cypress Tester').should('not.exist')
    })

    it('User can view the details of a successfully added inventory report', () => {
        cy.navigateToNewInventoryForm()

        // Draw a polygon
        cy.drawPolygon([
            { x: 180, y: 100 },
            { x: 180, y: 50 },
            { x: 150, y: 70 },
            { x: 180, y: 100 }
        ])
        // Set the inventory details
        cy.get('#inventorydate').type('2021-11-20')
        cy.getByTestId("dive").click()
        cy.getByTestId("visibility").select('good')
        cy.getByTestId("moreInfo").type('ei löytynyt mitään')
        cy.getByTestId("name").type('Cypress Tester')
        cy.getByTestId("email").type('cypress@test.mail')
        cy.getByTestId("phone").type('+1234567890')
        cy.getByTestId("terms-of-services").check()
        cy.getByTestId("submit").click()
        // User should be redirected to the report's page
        cy.url().should('include', '/raportti/')
        // Check that the report page shows correct details
        cy.contains('20.11.2021')
        cy.contains('Sukellus')
        cy.contains('hyvä')
        cy.contains('ei löytynyt mitään')
        cy.contains('Cypress Tester')
        // Check that the contact details are not shown
        cy.contains('cypress@test.mail').should('not.exist')
        cy.contains('+1234567890').should('not.exist')
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
        cy.shouldBeLoggedIn()

        cy.navigateToNewInventoryForm()

        // Draw a polygon
        cy.drawPolygon([
            { x: 180, y: 100 },
            { x: 180, y: 50 },
            { x: 150, y: 70 },
            { x: 180, y: 100 }
        ])
        // Set inventory details
        cy.get('#inventorydate').type('2020-05-18')
        cy.getByTestId("moreInfo").type('ei löytynyt mitään')
        cy.getByTestId("other").click()
        cy.getByTestId("methodInfo").type('Test method')
        cy.getByTestId("submit").click()
        // Name and contact info should be pre-filled and not editable
        cy.getByTestId("name")
            .should('have.value', 'Cypress Tester')
            .and('be.disabled')
        cy.getByTestId("email")
            .should('have.value', 'cypress@test.mail')
            .and('be.disabled')
        cy.getByTestId("phone")
            .should('have.value', '+358989898989')
            .and('be.disabled')
        // Should be redirected to the report's page
        cy.url().should('include', '/raportti/')
        // Check that the sent report is shown in user's own inventories
        cy.navigateToUserPage()
        cy.getByTestId("own-inventories").click()
        cy.get('table').contains('td', '18.05.2020')
        cy.get('table').contains('td', 'Test method')
        cy.get('table').contains('td', 'Cypress Tester').should('not.exist')
    })

})