Feature: User registration

    Background:
        Given User opens the front page
    
    Scenario: User can navigate to the registration page
        When User clicks on the user button
        And User clicks on the register link
        Then User should be on the registration page

    Scenario: User is logged in and redirected to the front page after successful registration
        Given User navigates to the registration page
        Then User should be on the registration page
        When User enters the username "username"
        And User enters the password "valid_password"
        And User enters the email "e2e@test.com"
        When User clicks on the submit button
        Then User should be on the front page