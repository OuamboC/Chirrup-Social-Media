/**
 * 1.In this file , we first create the routes for each of the three End-points list below
 * 2.We import the the controller of this route [const posts=require....] 
 * 4.Pass the express'app to this route file
 * 3.We call functions for each endpoints [e.g : add_post]
 * 
 */

const social = require('../controllers/social.server.controller'); //Importation of the social controller in this route
const auth = require('../lib/authentication')  //Importation of the middleware "isAuthenticated" function 
//Pass the express'app to this route file 
module.exports = function(app){

    //Route to retrieve the details of a single user
    app.route('/users/:user_id')
        .get(social.getUser);
    //Route to follow  another user (add friends)
    app.route('/users/:user_id/follow')
        .post(auth.isAuthenticated ,social.followUsers)
        .delete(auth.isAuthenticated, social.unfollowUsers); //Endpoint to stop following a user (remove a friend)
    //Route to retrieve users when searching (Search for users)
    app.route('/search')
        .get(social.searchUsers);

     
};