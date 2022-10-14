describe('User login', () => {
	beforeEach(() => {
		const existing_user = {
			username: 'existing_user',
			password: 'password123',
			email: 'cypress@test.mail',
			phone: '',
			name: ''
		}

		cy.dropCollection('user', { failSilently: true }).then(response => {
			cy.log(response)
		})

		cy.request('POST', `${Cypress.config().backendUrl}/api/register/`, existing_user)

		cy.visit('/')
		cy.contains('Käyttäjä').click()
		cy.contains('Kirjaudu').click()
		cy.url().should('eq', `${Cypress.config().baseUrl}/kirjaudu`)
	})

	it('User is redirected to the front page after successful login', () => {
		cy.get('[data-testid="user-name"').type('existing_user')
		cy.get('[data-testid="pass-word"]').type('password123')
		cy.get('[data-testid="loginbutton"]').click()
		cy.url().should('eq', Cypress.config().baseUrl + '/')
	})

	it('Login fails with incorrect username', () => {
		cy.get('[data-testid="user-name"').type('non-existing user')
		cy.get('[data-testid="pass-word"]').type('password123')
		cy.get('[data-testid="loginbutton"]').click()
		cy.contains('Väärä käyttäjänimi tai salasana')
		cy.url().should('eq', Cypress.config().baseUrl + '/kirjaudu')
	})

	it('Login fails with incorrect password', () => {
		cy.get('[data-testid="user-name"').type('existing_user')
		cy.get('[data-testid="pass-word"]').type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
		cy.get('[data-testid="loginbutton"]').click()
		cy.contains('Väärä käyttäjänimi tai salasana')
		cy.url().should('eq', Cypress.config().baseUrl + '/kirjaudu')
	})

})