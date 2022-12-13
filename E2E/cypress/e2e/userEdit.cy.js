describe('User edit', () => {
	beforeEach(() => {
		const existing_user = {
			username: 'existing_user',
			password: 'password123',
			email: 'cypress@test.mail',
			phone: '',
			name: ''
		}

		cy.resetDatabase()
		cy.registerUser(existing_user)

		cy.visit('/')

        cy.loginWith('existing_user', 'password123')
	})

	it('Logged-in user can edit all of their details', () => {
        // Make sure user is on correct page
		cy.navigateToUserPage()
        cy.url().should('include', '/omasivu#tiedot')
        // Check details before editing
        cy.getByTestId("username").should('have.value', 'existing_user')
        cy.getByTestId("name").should('have.value', '')
        cy.getByTestId("email").should('have.value', 'cypress@test.mail')
        cy.getByTestId("phone").should('have.value', '')
        // Start editing details
        cy.contains('button', 'Muokkaa').click()
        // Replacing details
        cy.getByTestId("username").clear()
        cy.getByTestId("username").type('edited_user')
        cy.getByTestId("name").type('edited_name')
        cy.getByTestId("email").clear()
        cy.getByTestId("email").type('edited_email@test.mail')
        cy.getByTestId("phone").type('0400 123456')
        // Save edited details
        cy.contains('button', 'Tallenna').click()
        // Check details are correct after editing
        cy.getByTestId("username").should('have.value', 'edited_user')
        cy.getByTestId("name").should('have.value', 'edited_name')
        cy.getByTestId("email").should('have.value', 'edited_email@test.mail')
        cy.getByTestId("phone").should('have.value', '0400 123456')
	})

    it('Logged-in user can change their password', () => {
        // Make sure user is on correct page
		cy.navigateToUserPage()
        cy.url().should('include', '/omasivu#tiedot')
        // Edit password
        cy.contains('button', 'Vaihda salasana').click()
        cy.getByTestId("current-password").type('password123')
        cy.getByTestId("new-password").type('newpassword123')
        cy.getByTestId("new-password2").type('newpassword123')
        cy.contains('button', 'Tallenna').click()
        // Fix so the site loads before the next step
        cy.wait(500)
        // Testing new password by logging back in
        cy.logOut()
        cy.loginWith('existing_user', 'newpassword123')
        cy.shouldBeLoggedIn()
	})
})