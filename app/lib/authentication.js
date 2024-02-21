//Create a middleware function called isAutenticated 
/**
 * This function needs to:
 * 1.Get the X-Authorization token
 * 2.Use the model functions to convert it to an ID
 * 3.If there is no ID returned, then the middleware function should return a 401 Unauthorised response to the client
 * 4.Else, execute next() to keep processing
 */
const users = require("../models/user.server.models"); // Importation of the models of the users

const isAuthenticated = function( req, res, next) {
    //Create a token variable to retrieve the X-Authorization token
    let token = req.get('X-Authorization');
    //console.log(err);

    //Call the model functions (getIdFromToken) to convert the token object to an ID 
    users.getIDFromToken(token, (err, id) => {
        //if there is an error  or if there is no id returned , the server status returns a `401 Unauthorized error`
        if (err || id === null) {
            return res.sendStatus(401);
        }
        next(); //else , execute next() to keep processing
    });


}

module.exports = {
    isAuthenticated: isAuthenticated
}