describe('User logout', () => {
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
	})

  it('Logged-in user can logout and it returns user to the front page', () => {
		cy.loginWith('existing_user', 'password123')
    cy.window().its('localStorage.userDetails').should('exist')
    cy.navigateToUserPage()
    cy.getByTestId('logged-in-user-dropdown').contains('Kirjaudu ulos').then(option => {
      option[0].click()
    })
    cy.shouldBeOnThePage('/')
    cy.window().its('localStorage.userDetails').should('not.exist')
	})
})