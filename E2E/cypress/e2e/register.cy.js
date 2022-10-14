describe('User registration', () => {
	beforeEach(() => {
		const existing_user = {
			username: 'existing_user',
			password: 'password123',
			email: 'existing@test.mail',
			phone: '',
			name: ''
		}

		cy.dropCollection('user', {failSilently: true}).then(response => {
			cy.log(response)
		})

		cy.request('POST', `${Cypress.config().backendUrl}/api/register/`, existing_user)

		cy.visit('/')
		cy.contains('Käyttäjä').click()
		cy.contains('Rekisteröidy').click()
		cy.contains('Luo uusi tunnus')
		cy.url().should('eq', `${Cypress.config().baseUrl}/rekisteroidy`)
	})

	it('User is redirected to the front page after successful registration', () => {
		cy.get('#username').type('cypress_tester')
		cy.get('#password').type('password123')
		cy.get('#email').type('cypress@test.com')
		cy.get('[data-testid="submit"]').click()
		cy.url().should('eq', Cypress.config().baseUrl + '/')
	})

	it('Registration fails with a taken username', () => {
		cy.get('#username').type('existing_user')
		cy.get('#password').type('password123')
		cy.get('#email').type('cypress@test.com')
		cy.get('[data-testid="submit"]').click()
		cy.contains('Käyttäjänimi varattu! Valitse uusi.')
	})

	it('Registration fails with a taken email address', () => {
		cy.get('#username').type('new_username')
		cy.get('#password').type('password123')
		cy.get('#email').type('existing@test.mail')
		cy.get('[data-testid="submit"]').click()
		cy.contains('Sähköpostiosoite on jo käytössä!')
	})
})