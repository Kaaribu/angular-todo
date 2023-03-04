# To-Do List App

This is a simple To-Do List application built using TypeScript, Angular, Material UI, and Postgres. The app allows users to create a to-do list and translate the list items into 1 other language using Google/MS AI translation.
## Installation

Clone the repository from GitHub;

`git clone https://github.com/Kaaribu/angular-todo

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

## Deployed to Google Cloud

 [App link](https://kaaribu-todo.web.app)

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
