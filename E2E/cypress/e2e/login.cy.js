describe('User login', () => {
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

	it('User is logged in and redirected to the front page after successful login', () => {
		cy.loginWith('existing_user', 'password123')
		cy.shouldBeOnThePage('/')
		cy.shouldBeLoggedIn()
	})

	it('Login fails with incorrect username', () => {
		cy.loginWith('non-existing user', 'password123')
		cy.contains('Väärä käyttäjänimi tai salasana')
		cy.shouldBeOnThePage('/kirjaudu')
	})

	it('Login fails with incorrect password', () => {
		cy.loginWith('existing_user', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
		cy.contains('Väärä käyttäjänimi tai salasana')
		cy.shouldBeOnThePage('/kirjaudu')
	})

})