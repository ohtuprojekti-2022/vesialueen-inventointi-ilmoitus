# End-to-end testing
End-to-end tests are run with Cypress.
## Running the tests locally
### Setup
In directory `E2E`, install dependencies with the command:
```
npm install
```
Set the environment variables at `.env` file:
> The URLs should be set without trailing slash (the last '/' at the end of the URL).
```
CYPRESS_BASE_URL=<Frontend url>
CYPRESS_BACKEND_URL=<Backend url>
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
## Running the tests remotely in actions
### Setup
> Actions tests require backend to be hosted and linked to the e2e.yml. Frontend is cloned from staging. Backend server container is pushed from staging.

The correct backend url should be linked to the workflow:
> The URLs should be set without trailing slash (the last '/' at the end of the URL).
```
CYPRESS_BACKEND_URL: <Backend url>    env:
REACT_APP_BACKEND_URL: <Backend url>  env:
curl <Backend url>                    in the step "heroku e2e test backend"
wait-on: ---, <Backend url>           in the step "e2e tests"
```
### Run the tests
> Running the tests remotely might fail occasionally

The tests are run manually in actions by selecting "e2e" workflow and clicking "Run workflow"
