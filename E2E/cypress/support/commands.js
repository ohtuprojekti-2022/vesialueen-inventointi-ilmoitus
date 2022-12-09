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

Cypress.Commands.add('getByTestId', (selector) => {
    cy.get(`[data-testid=${selector}]`)
})

Cypress.Commands.add('loginWith', (username, password) => {
    // Login with UI
    cy.navigateToLoginForm()
    cy.getByTestId("user-name").type(username)
    cy.getByTestId("pass-word").type(password)
    cy.getByTestId("loginbutton").click()
})

Cypress.Commands.add('shouldBeOnThePage', (path) => {
    cy.url().should('eq', `${Cypress.config().baseUrl}${path}`)
})

Cypress.Commands.add('shouldBeLoggedIn', () => {
    cy.window().its('localStorage.userDetails').should('exist')
    cy.getByTestId("logged-in-user-dropdown").click()
    cy.contains('Kirjaudu ulos')
})

Cypress.Commands.add('navigateToLoginForm', () => {
    cy.getByTestId("user-dropdown").click()
    cy.getByTestId("login").click()
    cy.shouldBeOnThePage('/kirjaudu')
})

Cypress.Commands.add('navigateToRegistrationForm', () => {
    cy.getByTestId("user-dropdown").click()
    cy.getByTestId("register").click()
    cy.shouldBeOnThePage('/rekisteroidy')
})

Cypress.Commands.add('navigateToNewInventoryForm', () => {
    cy.getByTestId("new-inventory").click()
    cy.shouldBeOnThePage('/inventointi-ilmoitus')
})

Cypress.Commands.add('navigateToFrontpage', () => {
    cy.getByTestId("front-page").click()
    cy.shouldBeOnThePage('/')
})

Cypress.Commands.add('navigateToUserPage', () => {
    cy.getByTestId("logged-in-user-dropdown").click()
    cy.getByTestId("user-page").click()
    cy.shouldBeOnThePage('/omasivu#tiedot')
})

Cypress.Commands.add('drawPolygon', (points) => {
    // Draw a polygon by clicking on the points passed as an argument
    // The last point should be the same as the first
    cy.get('.leaflet-draw-draw-polygon').click().slowDown(100)
    cy.wrap(points).each(point => {
        cy.get('.leaflet-container').click(point)
    })
    cy.slowDownEnd()
})

Cypress.Commands.add('logOut', () => {
    cy.getByTestId('logged-in-user-dropdown').contains('Kirjaudu ulos').then(option => {
        option[0].click()
      })
    cy.shouldBeOnThePage('/')
})