// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('registerUser', (user) => {
    cy.request('POST', `${Cypress.config().backendUrl}/api/register`, user)
})

Cypress.Commands.add('shouldBeOnThePage', (path) => {
    cy.url().should('eq', `${Cypress.config().baseUrl}${path}`)
})

Cypress.Commands.add('shouldBeLoggedIn', () => {
    cy.window().its('localStorage.userDetails').should('exist')
    cy.get('[data-testid="logged-in-user-dropdown"]').click()
    cy.contains('Kirjaudu ulos')
})

Cypress.Commands.add('resetDatabase', () => {
    cy.request('POST', `${Cypress.config().backendUrl}/api/tests/reset`)
})