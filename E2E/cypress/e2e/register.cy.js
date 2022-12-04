describe('User registration', () => {
	beforeEach(() => {
		const existing_user = {
			username: 'existing_user',
			password: 'password123',
			email: 'existing@test.mail',
			phone: '',
			name: ''
		}

		cy.resetDatabase()
		cy.registerUser(existing_user)

		cy.visit('/')
		cy.navigateToRegistrationForm()
	})

	it('User is logged in and redirected to the front page after successful registration', () => {
		cy.get('#username').type('cypress_tester')
		cy.get('#password').type('password123')
		cy.get('#email').type('cypress@test.com')
		cy.get('[data-testid="terms-of-services"]').check()
		cy.getByTestId("submit").click()
		cy.shouldBeOnThePage('/')
	})

	it('Registration fails with a taken username', () => {
		cy.get('#username').type('existing_user')
		cy.get('#password').type('password123')
		cy.get('#email').type('cypress@test.com')
		cy.get('[data-testid="terms-of-services"]').check()
		cy.getByTestId("submit").click()
		cy.contains('Käyttäjänimi varattu! Valitse uusi.')
	})

	it('Registration fails with a taken email address', () => {
		cy.get('#username').type('new_username')
		cy.get('#password').type('password123')
		cy.get('#email').type('existing@test.mail')
		cy.get('[data-testid="terms-of-services"]').check()
		cy.getByTestId("submit").click()
		cy.contains('Sähköpostiosoite on jo käytössä!')
	})
})