/**
 * 1.In this file , we first create the routes for each of the six En-points list below
 * 2.We import the the controller of this route [const posts=require....] 
 * 4.Pass the express'app to this route file
 * 3.We call functions for each endpoints [e.g : add_post]
 * 
 */

const posts = require('../controllers/post.server.controllers') //Importation of the controller and call functions for each of the endpoints
const auth = require('../lib/authentication') //Importation of the middleware "isAuthenticated" function 

//Pass the express'app to this route file
module.exports = function(app){

    //Routes to add posts using path ('/posts')

    app.route('/posts')
        .post(auth.isAuthenticated, posts.add_post); //End-point to add a new post and its call function located in the controller


    //Routes using  path ('/posts/:post_id')
    app.route('/posts/:post_id')
        .get(posts.get_post)    //End-point to retieve a single post and its call function located in the controller
        .patch(auth.isAuthenticated, posts.update_post)   //End-point to update a single post and its call function located in the controller
        .delete(auth.isAuthenticated, posts.delete_post);  //End-point to delete a single post and its call function located in the controller


    //Routes using  path ('/posts/:post_id/like')
    app.route('/posts/:post_id/like')
        .post(auth.isAuthenticated, posts.add_like) //End-point to add a new like that matches  the specific id and its call function located in the controller
        .delete(auth.isAuthenticated, posts.remove_like);  //End-point to  delete/remove a  like that matches  the specific id and its call function located in the controller




}

