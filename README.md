# Universal Directory Visualizer


Requires Nodejs and npm to run

## Starting the project

Run `npm install` to install all packages

Run `npm start` to start the electron application

### Frontend (Angular)

All frontend development files are in frontend folder

`./scripts/frontendDev.ps1` will run the frontend in a development environment. It will start a server at "http://localhost:4200/" (clickable in terminal) for in browser. It will also auto update the webpage with any save you make to the folder so you don't have to keep refreshing the page after every change.

`./scripts/buildFrontend.ps1` will build and compile the frontend for production and move it into the src/public folder for electron to serve it in app.

### Backend (Java)

I recommend opening the backend folder in intellij and doing all backend testing though there. There are a couple tests in the src/main/tests folder for quick testing and development.

`./scripts/buildBackend.ps1` will build and compile the backend into a jar and move it into the src/server folder for electron to serve it in app.

## Sprint 1 Note

Joshua Elmer pushed this line
