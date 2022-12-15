# Architecture
![Architecture diagram](architecture_diagram.png)

## General architecture
The program consists of a backend using Python's Flask library and a frontend made with React.
The backend uses a MongoDB database to store data. Backend and frontend are hosted on Heroku, MongoDB is hosted
at MongoDB Atlas. The project uses GitHub Actions for the CI.

## Frontend
Frontend is made using React. React-Bootstrap is used for the UI components. The state of the application is managed
using the Redux library.

Map features are implemented using Leaflet (React Leaflet). Map data is obtained from OpenStreetMaps, Maanmittauslaitos
(terrain map) and Esri (satellite map).

## Backend
The backend is made using the Flask library for Python. Flask-RESTX library has been used for better management of
API endpoints. The backend talks to the database using the PyMODM library.

JWT tokens are used to manage user status between backend and frontend.

## Testing and validation
### Backend
Backend is tested using pytest library. Pylint is used for linting.

### Frontend
In frontend, Jest is used for testing. Eslint is used for linting.

### E2E testing
End-to-end testing is done using Cypress. It is automated and it has GitHub Actions workflows in this repository.
Separate versions of the backend and frontend are running in Heroku for E2E testing.

## CI/CD and hosting
### Automated tests
Backend and frontend both have GitHub Actions workflows that run tests with each commit.
The test coverage report is also created at the same time and uploaded to the Codecov service.

### Deployment
The backend and frontend both have GitHub Actions workflows that build Docker images and pushes them to Heroku
automatically.

#### Backend
The backend image installs the dependencies using pip and then installs the Gunicorn server, which is used to run
the production version inside the container.

#### Frontend
The frontend image build is done in two stages. The first stage installs the dependencies using npm and builds the
React app. The second stage uses the nginx base image. Then it copies the production build made in the previous stage.
The frontend build then uses some bash trickery to get the correct PORT environment variable value assigned by Heroku.

## Database
Inventory reports, attachment files and user data are stored in the MongoDB database. To access the database in Python,
the PyMODM library is used.

Attachment files are stored in the MongoDB database as binary data. PyMODM handles most of the file handling. GridFS is
used to support files larger than 16 megabytes.
