/**
 * 1.Creation of each of the functions called in [post.server.routes.js]
 * 2.Set each function to return a 500 response to the client
 * 3. At the bottom of the controller , export the functions so that they can be accessed by other files (e.g:the routes file)
 * 4. At the top of the server,create the variable posts to require in the model file so that we can access the addNewPost function
 */

//Create the variable posts to require in the model file so that we can access the addNewPost function
const posts = require("../models/post.server.models");

const users = require("../models/user.server.models");

//Require Joi for request validation
const Joi = require('joi');
//Require 'bad-words' library to remove profanity in a text 
const Filter = require('bad-words');
//Create a profanity filter using 'bad-words' library
const profanityFilter = new Filter();

//Creation of add_post()  called in [post.server.routes.js] and its implementation
const add_post = (req, res) => {
    //Validate the incoming data using Joi to ensure that it matches the API specification
    //if there are any issues , then we will return a 400 response to the user.
    const schema = Joi.object({ // Define a Joi schema for validating the request body
        text: Joi.string().required() //Ensure that the text inputby the user is a string 
    });
    //Validate the request body using the Joi schema
    const { error } = schema.validate(req.body);
    console.log(error);
    //If there's an error , such as the test is a number , return a 400(Bad Request) response 
    if (error) return res.sendStatus(400);
    let post = Object.assign({}, req.body); // This line converts the request body to an object

    let token = req.get('X-Authorization'); //get token

    //Call the model functions (getIdFromToken) to convert the token object to an ID
    users.getIDFromToken(token, (err, user_id) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            // Called  the profanity filter to clean the bad words in a post 
            post.text = profanityFilter.clean(post.text);
            //implement so that the user_id could be used
            posts.addNewPost(user_id, { text: post.text }, (err, id) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    return res.status(201).send({ post_id: id });
                }
            })
        }
    });
};



//Creation of get_post()  called in [post.server.routes.js] and its implementation
const get_post = (req, res) => {
    //Since the path parameter is a string , convert it to an integer , and store it in the `post_id` variable 
    let post_id = parseInt(req.params.post_id);
    //Call the `getSinglePost` function to retrieve a specific post with the specified ID
    posts.getSinglePost(post_id, (err, result) => {
        //If the model returns "404" as the error parameter, then we will return a 404 response
        if(err === 404) return res.sendStatus(404)
        //if the model returns any other error then we will return a 500 response
        if (err) return res.sendStatus(500)

        //If there are no errors then we return a 200 response with the data from the model function.
        return  res.status(200).send(result)
    })
    
};

//Creation of update_post()  called in [post.server.routes.js] and its implementation
const update_post = (req, res) => {
    //Since the path parameter is a string , convert it to an integer , and store it in the `post_id` variable 
    let post_id = parseInt(req.params.post_id);
    //Create the token varaiable to retrieve the "X-Authorization"
    let token = req.get('X-Authorization'); 
    // Call the model function 'getIDFromToken' to convert the token into ID
    users.getIDFromToken(token, (err, user_id) => {
        if (err) {
            return res.sendStatus(401); // Unauthorized
        }
        //Call the `getSinglePost` function to retrieve a specific post with the specified ID
        posts.getSinglePost(post_id, (err, post) => {
            if (err === 404)  return res.sendStatus(404); // Not Found else 
            if (err) return res.sendStatus(500); // Internal Server Error
            
            const schema = Joi.object({
                text: Joi.string().required()
            });
            const { error } = schema.validate(req.body);
            if (error) {
                return res.status(400).send(error.details[0].message); // Bad Request
            }
            
            // Check if the user has permission to update this post
            if (post.author.user_id !== user_id) {
                return res.status(403).send("You can only update your own posts"); 
            }
            if (post.text === req.body.text) {
                return res.sendStatus(200); // No change
            }
            //Finally, we call the model function to update the post
            posts.updatePost(post_id, req.body.text, (err) => {
                if (err) {
                    return res.sendStatus(500); // Internal Server Error
                }
                return res.sendStatus(200); // if no error , update the post
                
            });
        });
    });
};


//Creation of delete_post()  called in [post.server.routes.js] and its implementation
const delete_post = (req, res) => {
    // Since the path parameter is a string, convert it to an integer and store it in the `post_id` variable 
    let post_id = parseInt(req.params.post_id);
    // Create the token variable to retrieve the "X-Authorization"
    let token = req.get('X-Authorization');
    users.getIDFromToken(token, (err, user_id) => {
        if (err) return res.sendStatus(401); // Unauthorized
        posts.getSinglePost(post_id, (err, post) => {
            // If there's an error, respond with a 404 status
           if (err === 404) return res.sendStatus(404); // Post not found
            // If there's an error, respond with a 500 status
            if (err) return res.sendStatus(500); // Internal Server Error
            // Check if the user has permission to delete this post
            if (post.author.user_id != user_id) {
                return res.status(403).send("You can only delete your own posts");
            }
            // Delete the post
            posts.deletePost(post_id, user_id, (err) => {
                // If there's an error, respond with a 404 status
                if (err ) {
                    return res.sendStatus(404); // Post not found
                }
                // If no error, respond with a 200 status
                return res.sendStatus(200); // Successfully deleted the post
            });
        });
    });
};











//Creation of add_like()  called in [post.server.routes.js] and its implementation
const add_like = (req, res) => {
    //Since the path parameter is a string , convert it to an integer , and store it in the `post_id` variable 
    let post_id = parseInt(req.params.post_id);
    //Create the token varaiable to retrieve the "X-Authorization"
    let token = req.get('X-Authorization');
    // Call the model function 'getIDFromToken' to convert the token into ID
    users.getIDFromToken(token, (err,user_id) =>{
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }else{
            //Finally , we call the model function to add a like to the post

            posts.likePost(post_id, user_id, (err) => {
                
                if(err === 404) return res.sendStatus(404);
                if(err) return res.sendStatus(403);
                return res.sendStatus(200); //Successfully add a like on the post 
            })
        }

    })
   
    
}

//Creation of remove_like()  called in [post.server.routes.js] and its implementation
const remove_like = ( req, res) => {
    //Since the path parameter is a string, convert it to an integer , and store it in the `post_id` variable
    let post_id = parseInt(req.params.post_id);
    //Since the path parameter is a string , convert it to an integer , and store it in the `user_id` variable 
    //let user_id = parseInt(req.params.user_id);

    //Create a token variable to retrieve the "X-Authorization"
    let token = req.get('X-Authorization');
    //Call the model function `getIDFromToken` to convert the token object into an ID
     users.getIDFromToken(token, (err, user_id)=>{
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }else {
            //Finally, we call the model function to delete the like on the post 
            posts.unlikePost(post_id, user_id, (err) => {
                //if there's an error , response with a 404 status 
                if (err === 404) return res.sendStatus(404);
                if (err) return res.sendStatus(403);
                return res.sendStatus(200); //if no error, remove the like on the post 
            })
        }
    })

   
    
}

//Export the functions so that they can be accessed by other files (e.g:the routes file)
module.exports = {
    add_post: add_post,
    get_post: get_post,
    update_post: update_post,
    delete_post: delete_post,
    add_like: add_like,
    remove_like: remove_like,

};