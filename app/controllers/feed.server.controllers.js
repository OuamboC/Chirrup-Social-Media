//Create the variable posts to require in the model file so that we can access the addNewPost function

const users = require("../models/user.server.models");
const feed = require("../models/feed.server.models");

const getFeed = (req, res) => {
   
    //Create the token variable to retrieve the "X-Authorization"
    let token = req.get('X-Authorization');

    if (!token) {
        // No authentication token provided, return all posts ordered by date
        return feed.getAllPosts((err, allPosts) => {
            if (err) {
                console.error(err);
                return res.sendStatus(500); // Internal Server Error
            }
            return res.status(200).json(allPosts);
        });
    }
    users.getIDFromToken(token, (err, user_id) => {
        if (err || !user_id) {
            console.error(err);
            return res.sendStatus(401); // Unauthorized
        }
        feed.getfeedUser(user_id, (err, results) => {
            if (err) {
                console.error(err);
                return res.sendStatus(500); // Internal Server Error
            }
            if (!results || !results.allPosts) {
                return res.status(200).json([]);
            }
            // Return the user's feed
            return res.status(200).json(results.allPosts);
        });
    });
};

module.exports = {
    getFeed: getFeed
};
