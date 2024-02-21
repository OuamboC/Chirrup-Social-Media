/**
 * 1.Creation of each of the functions called in [user.server.routes.js]
 * 2.Set each function to return a 500 response to the client
 * 3. At the bottom of the controller , export the functions so that they can be accessed by other files (e.g:the routes file)
 * 4. At the top of the server,create the variable posts to require in the model file so that we can access the addNewPost function
*/

const users = require ("../models/user.server.models");

//Require Joi for request validation
const Joi = require('joi');

//Creation of add_user()  called in [user.server.routes.js] and its implementation
const add_user =(req, res) => {
    //Validate the incoming data using Joi to ensure that it matches the API specification
    //if there are any issues , then we will return a 400 response to the user.
    const schema = Joi.object ({  //Define a Joi schema for validating the request body
        first_name : Joi.string().required(), //Ensure that the first_name input by the user is a string
        last_name : Joi.string().required(), //Ensure that the last_name input by the user is a string
        username: Joi.string().required(), //Ensure that the username input by the user is a string
        password: Joi.string().required().min(8).max(20).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\\d!@#$%^&*(),.?":{}|<>]+$'))                     //Ensure that the password input by the user is a string 
    });
    //Validate the request body using the Joi schema
    const { error } = schema.validate(req.body);
    //if there's an error , such as the req.body.params  doesn't respect the schema set , return a 400 (Bad request) status
    if(error) return res.status(400).json({"error_message" : error.details[0].message});
    //If the data pass validation (i.e: The function  doesn't return a 400 response)
    //then we are going to call the "addNewUser" fucntion  that we've created in the [user.srver.models.js]
    //We need to define the callback function ( the done parameter) so that we can define how the response is handled.
    //In this case, we are going to check that there is no error , and then return the user_id to the client  with a 201 (Created) response code

    let user = Object.assign({}, req.body); //This line converts the request body to an object

    //Finally , we call the model function to update the ceration of users with the new data 
    users.addNewUser(user, (err, id) => {
        
        if(err) {
            console.error(err); //Log the error for debugging
            //if there's an error when adding a new user , the server respond with a 500 message
            return res.sendStatus(500);
        }else{
            //if the User is created successfuly , send a 201 Created response status with the user_id
            return res.status(201).send({user_id: id});
        }
    })

    
};


//Creation of login_acc()  called in [user.server.routes.js] and its implementation
const login_acc = (req, res) => {
    //Validate the incoming data using Joi to ensure that it matches the API specification
    //if there are any issues , then we will return a 400 response to the user.
    const schema = Joi.object({  //Define a Joi schema for validating the request body

        username: Joi.string().required(), //Ensure that the username input by the user is a string
        password: Joi.string().required() //Ensure that the password input by the user is a string 
    });
    //Validate the request body using the Joi schema
    const { error } = schema.validate(req.body);
    //if there's an error , such as the req.body.params  doesn't respect the schema set , return a 400 (Bad request) status
    if (error) return res.status(400).json({ "error_message": error.details[0].message });

    //if the validation is sucessful , we continue with the following 
   
    //Step 1 : Call the model function "authenticateUser" to login into the user account
   users.authenticateUser(req.body.username, req.body.password, (err, id) => {
       //if callback function returns value of 404 ,it means that user account was Not found, 
       //In this case ,the server must respond with a 400(Bad request) and indicate the error
       if (err === 404) return res.status(400).send({"error_message" : "Incorrect username/password"})

    //if there is any other eror(not 404) during user authentication , return a 500 (Internal Server error status)
    if(err) return res.sendStatus(500)

    //Now, if the user passes authentication, we try to get the session_token from the DB
    //Step2 : Let's check if the user hasn't already logged in to this ,we will call the model function getToken() [ This is for the user not to loggin twice]
    users.getToken(id, (err, token) => {
        if(err) return res.sendStatus(500) // if error such as the user_id doesn't exist , return a 500(Internal ERROR)

        if(token){ //if token exists , return the id and the session_token  and the server status must be 200.
            return res.status(200).send({user_id: id, session_token: token})
           

        }else{ //if no token exists , then setToken() will create a new token and save it in the DB
            users.setToken(id,(err, token) => {
                if(err) return res.sendStatus(500)
                return res.status(200).send({user_id: id, session_token:token})
            })
        }
    })
   })
    
};



//Creation of logout_acc()  called in [user.server.routes.js] and its implementation
const logout_acc = (req, res) => {
    
    let token = req.get('X-Authorization');
    //Call the model function "removeToken" to log out the user
    users.removeToken(token, (err) => {
       if(err) {
        console.log(err); //log console for debugging
        return res.sendStatus(500);
       }
       if(!token) {
           console.log(err); //log console for debugging
        //if no session_token is found in the database , the server status must return a `401 NOT authorised error`
        return res.sendStatus(401);
       }else {
        //if no errors founds , the uer must be looged out and the server status must be 200 (OK)
        return res.sendStatus(200);
       }
    })
   
};

//Export the functions so that they can be accessed by other files (e.g:the routes file)

module.exports ={
    add_user: add_user,
    login_acc: login_acc,
    logout_acc: logout_acc

};