/**
 * 1.In this file , we first create the routes for each of the three End-points list below
 * 2.We import the the controller of this route [const posts=require....] 
 * 4.Pass the express'app to this route file
 * 3.We call functions for each endpoints [e.g : add_post]
 * 
 */
const users = require('../controllers/user.server.controllers') //Importation of the controller and call functions for each of the endpoints
const auth = require('../lib/authentication')  //Importation of the middleware "isAuthenticated" function 

//Pass the express'app to this route file 
module.exports = function(app){

    //Route to add users using path ('/users')

    app.route('/users')
        .post(users.add_user);//End-point to add a new user and its call function located in the controller

    //Route using path ('/login')

    app.route('/login')
        .post(users.login_acc);//End-point for users to  log into an account  and its call function located in the controller

    //Route using path ('/logout')

    app.route('/logout')
        .post(auth.isAuthenticated, users.logout_acc);//End-point for users to log out of an account  and its call function located in the controller

}
