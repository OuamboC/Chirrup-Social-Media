# My full-stack web development assignment 23/24 -Semester 1 

# Overview

This repository documents the development of both the frontend and backend for Chirrup, a social media platform, as part of my full-stack web development assignment during Semester 1.

# Chirrup social-Media FrontEnd Development

**Setup of Vue.js App**

1.Created a new directory for the frontend app separate from the backend.

2.Initialized the Vue app in the terminal using **'npm init vue@latest'**.

3.Installed dependencies and ran the development server.

4.Removed starter templating code, assets, and components from the template directory **'(src)'**.

5.Modified **' main.js'** to remove CSS imports.

**Development Process**

1.Added Vue Router by installing **'vue-router'**.
2.Created a router directory **'(src/router)'** with an **'index.js'** file.
3.Defined route paths and components in the router file.
4.Imported and configured the router in **'main.js'**.
5.Used **'<router-view />'** for component rendering and **'<router-link />'** for navigation.
6.Organized project structure with directories like **'views'** (pages), **'components'**, **'router'**, and **'services'**.
7.Implemented service files (**'auth.post.service.js'** , **'auth.service.js'**, **'auth.social.service.js'**, **'posts.service.js'**, **'user.service.js'**) for managing API requests.
8.Implemented functionality for both non-authenticated and authenticated users, including viewing posts, creating an account, logging in, getting user details, searching for users, updating and deleting posts, following/unfollowing users, liking/unliking posts.

**Installation**

To run this Vue.js application locally, follow these steps:

1.Clone this repository:

git clone https://github.com/OuamboC/Chirrup-Social-Media.git

2.Navigate into the project directory:

cd Chirrup-Social-Media/vue-project

3.Install dependencies:

npm install

4.Run the development server:

npm run server

5.Once the development server is running, you will receive a URL to access the application. Typically, it's **'http://localhost:8080/'**, but it may vary depending on your environment.

6.Open the provided URL in your web browser to view the Chirrup Social Media application.


**Technologies Used**

- Vue.js
  
-Vue Router 

**Project Structure**

- /src
   - /router: Contains Vue Router configuration.
   - /views: Vue.js views or pages.
   - /components: Reusable Vue components.
   - /services: Files for managing API requests.

**Usage**

**Non-Authenticated Users**

1.**View Posts**: Non-authenticated users can browse and view all posts made by other users.

2.**Create an Account**: They have the option to create a new account to access additional features.

3.**Log In**: After creating an account, users can log in to access personalized content and features.

4.**Get User Details**: Users can retrieve details of a single user, such as their profile information and posts.

5.**Search for Users**: They have the ability to search for specific users by username.

6.**View Single Post**: Users can view detailed information about a single post.

**Authenticated Users**

In addition to the above functionalities, authenticated users gain access to the following features:

1.**Log Out**: Authenticated users can log out of their accounts to secure their session.

2.**Follow Other Users**: Users can choose to follow other users to stay updated with their posts.

3.**Stop Following Users**: They have the option to unfollow users if they no longer wish to see their posts.

4.**Update Their Post**: Authenticated users can edit and update their own posts as needed.

5.**Delete Their Post**: They have the ability to delete their own posts from the platform.

6.**Like Posts**: Users can like posts made by other users to show appreciation or agreement.

7.**Unlike Posts**: They can also remove their likes from posts if they change their opinion.

These functionalities provide users with a seamless and interactive experience on the Chirrup social media platform, catering to both non-authenticated and authenticated users' needs.



 
                                           

# Chirrup social-Media BackEnd Development



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











