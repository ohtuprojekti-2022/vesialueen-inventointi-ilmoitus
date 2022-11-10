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
		cy.contains('Käyttäjä').click()
		cy.contains('Kirjaudu').click()
		cy.shouldBeOnThePage('/kirjaudu')
	})

	it('User is logged in and redirected to the front page after successful login', () => {
		cy.get('[data-testid="user-name"').type('existing_user')
		cy.get('[data-testid="pass-word"]').type('password123')
		cy.get('[data-testid="loginbutton"]').click()
		cy.shouldBeOnThePage('/')
		cy.shouldBeLoggedIn()
	})

	it('Login fails with incorrect username', () => {
		cy.get('[data-testid="user-name"').type('non-existing user')
		cy.get('[data-testid="pass-word"]').type('password123')
		cy.get('[data-testid="loginbutton"]').click()
		cy.contains('Väärä käyttäjänimi tai salasana')
		cy.shouldBeOnThePage('/kirjaudu')
	})

	it('Login fails with incorrect password', () => {
		cy.get('[data-testid="user-name"').type('existing_user')
		cy.get('[data-testid="pass-word"]').type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
		cy.get('[data-testid="loginbutton"]').click()
		cy.contains('Väärä käyttäjänimi tai salasana')
		cy.shouldBeOnThePage('/kirjaudu')
	})

})