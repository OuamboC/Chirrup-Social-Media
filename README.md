# My full-stack web development assignment 23/24 -Semester 1 
                                           

# Chirrup social-Media Backend Development

**Overview**

This repository documents the development of the backend for Chirrup, a social media platform, as part of my full-stack web development assignment during Semester 1.+++

**Assignment Setup**

1.Installed NodeJS on my machine. ([Download NodeJS](https://nodejs.org/en/download/))

2.Installed Git on my machine.  ([Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git))

3.Cloned the starter code provided by my Unit Leader, Ash Williams, using the command: git clone https://github.com/ash-williams/fsd_chirrup_server

4.Navigated to the project's root directory in the terminal: cd fsd_chirrup_server

5.Installed all project dependencies: npm install

6.Started the server using: npm run dev. The server runs on port 3333.

7.Ran tests in a separate terminal window using: npm run test. The tests mostly fail due to the absence of written code.

8.Before re-running tests, wiped the database by executing: npm run wipe.

9.Referenced the API documentation located on Swagger [here](https://app.swaggerhub.com/apis/MMU-SE/Chirrup/1.0.0/#/)

**Development Process**

1.Established a structured directory layout within the app directory, organizing routes, models, and controllers.

2.Created four route files (**feed.server.routes.js**, **post.server.routes.js**, **social.server.routes.js**, **user.server.routes.js**) within the routes directory.

3.Implemented endpoints specified in the route files within corresponding controller files.

4.Imported different controllers and called functions for each endpoint implementation.

5.Created four controller files (**feed.server.controllers.js**, **post.server.controllers.js**, **social.server.controllers.js**, **user.server.controllers.js**) within the controller directory.

6.Defined functions in each controller file for handling business logic.

7.Exported functions from controller files for access by other components.

9.Linked route files to the main application (server.js) using require statements.

10.Created model files (**feed.server.models.js**, **post.server.models.js**, **social.server.models.js**, **user.server.models.js**) within the model directory.

11.Implemented functions within model files for interacting with the database.

12.Imported database file at the top of model files.

13.Utilized callback functions to manage asynchronous database interactions effectively.

14.Exported functions from model files for access by controllers.

15.Imported model files into respective controllers for accessing functions.

16.Implemented authentication functionalities within model functions.

17.Created a middleware function for authentication in the lib directory.

18.Imported the middleware function into route files and applied it to endpoints requiring authentication.

19.Utilized Postman for testing API endpoints.

20.Incorporated the "bad-words" dependency for profanity filtering.

**This development process ensures a structured and modular backend architecture for Chirrup, facilitating scalability, maintainability, and extensibility.**


Canis Ouambo











