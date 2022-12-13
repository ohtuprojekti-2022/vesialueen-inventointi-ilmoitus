describe('Filtering reports on frontpage', () => {
    // Editing reports is only for logged-in users
    // Tests always start with a report and as logged-in
    beforeEach(() => {
        cy.resetDatabase()
        cy.visit('/')

        cy.navigateToNewInventoryForm()

        cy.drawPolygon([
            { x: 180, y: 100 },
            { x: 180, y: 50 },
            { x: 150, y: 70 },
            { x: 180, y: 100 }
        ])

        cy.get('#inventorydate').type('2022-01-06')
        cy.getByTestId("other").click()
        cy.getByTestId("methodInfo").type('lentokone')
        cy.getByTestId("moreInfo").type('ei löytynyt mitään')
        cy.get('#email').type('cypress@test.mail')
        cy.get('[data-testid="terms-of-services"]').check()
        cy.getByTestId("submit").click()

        cy.url().should('include', '/raportti/')

        cy.navigateToFrontpage()

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

        cy.drawPolygon([
            { x: 280, y: 180 },
            { x: 280, y: 130 },
            { x: 250, y: 150 },
            { x: 280, y: 180 }
        ])

        cy.get('#inventorydate').type('2022-12-12')
        cy.getByTestId("sight").click()
        cy.getByTestId("visibility").select('bad')
        cy.getByTestId("moreInfo").type('pohjassa näkyi hylky')
        cy.getByTestId("submit").click()

        cy.url().should('include', '/raportti/')

        cy.navigateToFrontpage()
        })

    it('All filter features work', () => {
        // Both reports are shown on the page
        cy.contains('12.12.2022')
        cy.contains('06.01.2022')
        // Open filter options
        cy.contains('Suodata raportteja').click()
        // Test creator filter
        cy.get('#creator').type('Cypress Tester')
        cy.contains('12.12.2022')
        cy.contains('06.01.2022').should('not.exist')
        cy.contains('button', 'Tyhjennä suodatin').click()
        // Test city filter
        cy.get('#city').type('Espoo, Laajalahti')
        cy.contains('12.12.2022').should('not.exist')
        cy.contains('06.01.2022')
        cy.contains('button', 'Tyhjennä suodatin').click()
        // Test start-date filter
        cy.get('#startDate').type('2022-01-07')
        cy.contains('12.12.2022')
        cy.contains('06.01.2022').should('not.exist')
        cy.contains('button', 'Tyhjennä suodatin').click()
        // Test end-date filter
        cy.get('#endDate').type('2022-12-11')
        cy.contains('12.12.2022').should('not.exist')
        cy.contains('06.01.2022')
        cy.contains('button', 'Tyhjennä suodatin').click()
        // Test method filter
        cy.get('#method').select('Näköhavainto')
        cy.contains('12.12.2022')
        cy.contains('06.01.2022').should('not.exist')
        cy.contains('button', 'Tyhjennä suodatin').click()
        // Test sort-by-date feature
        cy.get('tbody > :nth-child(1) > :nth-child(1)').contains('12.12.2022')
        cy.get('tbody > :nth-child(2) > :nth-child(1)').contains('06.01.2022')
        cy.get('[data-testid="sortByDate"]').click()
        cy.get('tbody > :nth-child(1) > :nth-child(1)').contains('06.01.2022')
        cy.get('tbody > :nth-child(2) > :nth-child(1)').contains('12.12.2022')
        cy.contains('button', 'Tyhjennä suodatin').click()
        // Test free search
        // Finding one by description which is hidden and the other by location
        cy.get('#search').type('hylky')
        cy.contains('12.12.2022')
        cy.contains('06.01.2022').should('not.exist')
        cy.get('#search').clear()
        cy.get('#search').type('lahti')
        cy.contains('12.12.2022').should('not.exist')
        cy.contains('06.01.2022')
        cy.contains('button', 'Tyhjennä suodatin').click()
    })
})