const feed = require('../controllers/feed.server.controllers'); //Importation of the social controller in this route
const auth = require('../lib/authentication')  //Importation of the middleware "isAuthenticated" function 
//Pass the express'app to this route file 
module.exports = function (app) {

    //Route to retrieve all the posts from all of followers user and ( user himself)
    app.route('/feed')
        .get(feed.getFeed);
    
    
};