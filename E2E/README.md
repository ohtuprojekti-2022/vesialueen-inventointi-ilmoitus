# End-to-end testing
End-to-end tests are run with Cypress.
## Running the tests locally
### Setup
In directory `E2E`, install dependencies with the command:
```
npm install
```
Set the environment variables at `.env` file:
```
CYPRESS_BASE_URL=<Frontend url>
CYPRESS_BACKEND_URL=<Backend url>
CYPRESS_MONGO_URI=<MongoDB connection uri>
CYPRESS_DATABASE=<Name of the MongoDB database>
```
### Run the tests
> Before running the tests, both the backend server and the frontend server should be running in the background.

Run all test specs in headless mode with the command:
```
npx cypress run
```
Or open Cypress Dashboard with the command:
```
npm run cypress:open
```