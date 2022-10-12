import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"

describe('User registration', () => {

    Given('User opens the front page', () => {
        cy.visit('/')
    })
    
    Given('User navigates to the registration page', () => {
        cy.contains('Käyttäjä').click()
        cy.contains('Rekisteröidy').click()
    })
    
    When('User clicks on the user button', () => {
        cy.contains('Käyttäjä').click()
    })
    
    When('User clicks on the register link', () => {
        cy.contains('Rekisteröidy').click()
    })
    
    When('User enters the username {string}', (username) => {
        cy.get('#username').type(username)
    })
    
    When('User enters the password {string}', (password) => {
        cy.get('#password').type(password)
    })
    
    When('User enters the email {string}', (email) => {
        cy.get('#email').type(email)
    })
    
    When('User clicks on the submit button', () => {
        cy.get('#register-submit').click()
    })
    
    Then('Form should have {int} invalid fields', (invalidFields) => {
        cy.get('input:invalid').should('have.length', invalidFields)
    })
    
    Then('User should be on the front page', () => {
        cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
    
    Then('User should be on the registration page', () => {
        cy.contains('Luo uusi tunnus')
        cy.url().should('eq', Cypress.config().baseUrl + '/rekisteroidy')
    })
})