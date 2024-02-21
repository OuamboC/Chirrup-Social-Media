const 
  social = require('../models/social.server.models'),
    users = require("../models/user.server.models");
    posts = require ("../models/post.server.models");

//Create a function to retrieve the details of a single user
const getUser = (req ,res) => {
    //Since the path parameter is a string , convert it to an integer , and store it in the `user_id` variable 
    let user_id = parseInt(req.params.user_id);
    //Finally , we call the model function to getOneUser
    social.getOneUser(user_id, function (err, results) {
        console.log(err, results, user_id);
        //If the model returns "404" as the error parameter, then we will return a 404 response
        if (err === 404) return res.sendStatus(404);
        //if the model returns any other error then we will return a 500 response
        if (err) return res.sendStatus(500);
        console.log(results);
        //If there are no errors then we return a 200 response with the data from the model function.
        return res.status(200).send(results);
    })
       
}

//Create a function to follow  another user (add friends)
const followUsers = (req, res) => {
    //Since the path parameter is a string , convert it to an integer , and store it in the `user_id` variable 
   let user_id = parseInt(req.params.user_id);
    //Create the token varaiable to retrieve the "X-Authorization"
    let token = req.get('X-Authorization');
    // Call the model function 'getIDFromToken' to convert the token into ID
    users.getIDFromToken(token, (err, follower_id) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            //Finally , we call the model function to follow a User as friend
            social.followUser(follower_id, user_id, (err, result) =>{
                if(err === 404) return res.sendStatus(404);
                if(err) return res.sendStatus(403);
                console.log(result);
                return res.status(200).send("You follow another User!!!!")
                 
            })

        }
    })
}
//Create a function to stop following a user (remove a friend)
const unfollowUsers = (req, res) => {
    //Since the path parameter is a string , convert it to an integer , and store it in the `user_id` variable 
    let user_id = parseInt(req.params.user_id);
   
    //create the token varaiable to retrieve the "X-Authorization"
    let token = req.get('X-Authorization');
    // Call the model function 'getIFFromToken' to convert the token into ID
    users.getIDFromToken(token, (err, follower_id) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            //Finally , we call the model function to Unfollow a User as friend
            social.unfollowUser(user_id, follower_id, (err) => {
                if (err === 404) return res.sendStatus(404);
                if (err) return res.sendStatus(403);
                return res.status(200).send("You unfollow this User!!!!")
            })


        }

    })
    
}
//Create a function to retrieve users when searching (Search for users)
const searchUsers = (req, res) => {
    let q = req.query.q;
    if(!q) {
        // set q equal to empty string
        q = "";
    }
    // Finally, call the model function to search for a User
    social.search_Users(q,  function (err, results) {
        //If the model returns "404" as the error parameter, then we will return a 404 response
        if (err === 404) return res.sendStatus(404);
        //if the model returns any other error then we will return a 500 response
        if (err) return res.sendStatus(500);
        // If there are no errors, return a 200 response with the data from the model function.
        return res.status(200).send(results);
    });
};


module.exports = {
    getUser: getUser,
    followUsers: followUsers,
    unfollowUsers: unfollowUsers,
    searchUsers: searchUsers
}