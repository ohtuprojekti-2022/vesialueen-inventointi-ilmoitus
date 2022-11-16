// ***********************************************
// For comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
Cypress.Commands.add('resetDatabase', () => {
    cy.request('POST', `${Cypress.config().backendUrl}/api/tests/reset`)
})

Cypress.Commands.add('registerUser', (user) => {
    cy.request('POST', `${Cypress.config().backendUrl}/api/register`, user)
})

Cypress.Commands.add('loginWith', (username, password) => {
    // Login with UI
    cy.navigateToLoginForm()
    cy.get('[data-testid="user-name"').type(username)
    cy.get('[data-testid="pass-word"]').type(password)
    cy.get('[data-testid="loginbutton"]').click()
    cy.shouldBeLoggedIn()
})

Cypress.Commands.add('shouldBeOnThePage', (path) => {
    cy.url().should('eq', `${Cypress.config().baseUrl}${path}`)
})

Cypress.Commands.add('shouldBeLoggedIn', () => {
    cy.window().its('localStorage.userDetails').should('exist')
    cy.get('[data-testid="logged-in-user-dropdown"]').click()
    cy.contains('Kirjaudu ulos')
})

Cypress.Commands.add('navigateToLoginForm', () => {
    cy.get('[data-testid="user-dropdown"]').click()
    cy.get('[data-testid="login"]').click()
    cy.shouldBeOnThePage('/kirjaudu')
})

Cypress.Commands.add('navigateToNewInventoryForm', () => {
    cy.get('[data-testid="new-inventory"]').click()
    cy.shouldBeOnThePage('/inventointi-ilmoitus')
})

Cypress.Commands.add('navigateToFrontpage', () => {
    cy.get('[data-testid="front-page"]').click()
    cy.shouldBeOnThePage('/')
})

Cypress.Commands.add('navigateToUserPage', () => {
    cy.get('[data-testid="logged-in-user-dropdown"]').click()
    cy.get('[data-testid="user-page"]').click()
    cy.shouldBeOnThePage('/omasivu#tiedot')
})