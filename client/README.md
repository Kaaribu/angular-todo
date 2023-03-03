# To-Do List App

This is a simple To-Do List application built using TypeScript, Angular, Material UI, and Postgres. The app allows users to create a to-do list and translate the list items into 1 other language using Google/MS AI translation.
## Installation

Clone the repository from GitHub;

`git clone https://github.com/<your-username>/todo-list-app.git

### Install the dependencies:

`cd todo-list-app` 
`npm install` 

Run the json-server for the database:

`json-server --watch db.json`

Start the application by running `ng serve`

## Usage
1. Navigate to `http://localhost:4200` in your browser to use the application.
2. Signup or login to the application.
3. Add items to the to-do list.
4. Click the "Translate" button to translate the items into 1 other language.
5. Logout from the application.
6. As an admin, you can access the admin UI by navigating to `http://localhost:4200/admin` in your browser.
7.  Click on a user to view their usage history and whether they have clicked the "Translate" button.

## Deployment to Google Cloud

To deploy the application to Google Cloud, follow the steps below:

1. Create a new project on Google Cloud and enable the Cloud SQL Admin API, Cloud Build API, and Cloud Run API.
2. Create a new Cloud SQL instance and database.
3. Create a new Cloud Storage bucket to store the Cloud Build configuration files.
4. Update the cloudbuild.yaml file with the appropriate variables for your project.
5. Create a new trigger in Cloud Build to automatically deploy changes to Cloud Run when changes are pushed to the master branch of the repository.
6. Push the changes to the master branch of the repository.

## Testing

To run automated tests for the application, run the following command:

`npm test`

## Changelog
-  Implemented ngrx store for the translate button
- Added GitHub Actions for CI/CD on code push to master
- Implemented UI testing 


## Built With
Angular 14, Material UI, Firebase, Google Cloud

## Credits

- Author: Karabo Masalesa - [My Github link](https://github.com/Kaaribu)

## Repository

https://github.com/Kaaribu/angular-todo