/**
 * In this file , we will create the functions that interact with the database.
 * 1. At the top of the models files , require in the database 
 * 2.Create a function called addNewPost and implement it
 * 3.Exports the function "addNewPost" so it can be seen by other files (i.e: the controller)
 * 4.Create a new function called getSinglePost and implement it
 * 5.Exports the function "getSinglePost" so it can be seen by other files (i.e: the controller)
 * 6.Create a new function called updatePost and implement it
 * 7.Exports the function "updatePost" so it can be seen by other files (i.e: the controller)
 * 8.Create a new function called deletePost and implement it
 * 9.Exports the function "deletePost " so it can be seen by other files (i.e: the controller)
 * 10.Create a new function called likePost and implement it
 * 11.Exports the function "likePost" so it can be seen by other files (i.e: the controller)
 * 12.Create a new function called unlikePost and implement it
 * 13.Exports the function "unlikePost" so it can be seen by other files (i.e: the controller)
 */

//The variable "db" store the database of the app
const db = require ("../../database"); // require in the database

//Create a function called addNewPost.
/**
 * This function will add the details of a new post to the database
 * This function is going to take in two parameters.
 * 1.The first will have the post details as a JSON object 
 * 2.The second will be a function called "done" .
 * Once we have finished our DB interaction , we will execute the done function.
 * This is called a callback function and allows the code calling  the function 
 * to define what happens when the addNewPost function has finished 
 */

const addNewPost =(author_id, post, done) => {
    
    //Create the sql variable to insert (via insert query) new data  into the database
    //The dababase requires to send the post's text , as well as the date when the post was added (i.e:now ) and the ID of the author of the post
    const sql = 'INSERT INTO posts (text, date_published, author_id) VALUES (?, ?, ?)'
    //Create the values variable to store the req.body.params we need from the users

    let values = [post.text, Date.now(),author_id];

    //For adding a post to the database, we can use "db.run() function"
    /**
     * The run() function takes in three parameters .
     * 1.The SQL statement to execute
     * 2. Any parameteres needed for the SQL statement
     * 3.A function that will execute afterwards- ( This is a callback function)
     */
    db.run(sql, values, function(err){
        console.log(err,values)
        //if an eerors occurs such as all VALUES is not given by the users 
        //display the error made by the user.
        if (err) return done(err);
        //if no errors , then the "done" callback passing a null to indicate no error at the matching id 
        return done(null, this.lastID);
        
        
    })
}

//Create a new function called getSinglePost and implement it

/**
 * This function will contain two parameters :
 * 1.the post_id of the post we want to retrieve
 * 2.A callback so that the calling code can specify what happens afterwards
 */

//To break down the problem down, we can gather the required data from the database using 2 separate database instruction
 //The first will retrieve the post and author details and then the second will retrieve the array of likes

/**
 * I-)For the  1st DB interaction : (To retrieve the post and author details )
 * 1. We can get all of the information in a single record  (i.e: one row from the database)
 * 2. We need to pull the post data from the posts table(using the post_id being passed in)
 * 3. and then the users data from  the users table 
 */
 

const getSinglePost = ( post_id, done ) => {

    //Create the sql query by selecting  the posts data  from the posts(p) table
    //and the users data from the users(u) table  where we required the users to enter the post_id 
    //and the post autor_id  got the same value as the id of the user
    const sql =`SELECT p.post_id, p.date_published, p.text, u.user_id, u.first_name, u.last_name, u.username
                  FROM posts p, users u
                  WHERE p.post_id=?
                  AND p.author_id = u.user_id`;
    

     //Because we are only returning a single row from the database  we can use the db.get() function.
    /**
     * The get() function takes in 3 parameters :
     * 1.The SQL statement to execute
     * 2.An array of parameters for the SQL statement 
     * 3.A function to execute on completion .
     * The function passes in any errors ,and the data returned from the data returned from the DB as parameters
    */
   db.get(sql, [post_id], function(err, post_details){
        console.log(err, post_details, post_id)
       //if there is an error when executing the get() function, we return the error up to the controller 
       //so that it can handled ( by returning a 500 response)
       if (err) return done(err);
       //if there is no data returned by the get() function , then we refer up to the controller again ,
       // but this time ,set the error to be "404". This tells the controller that it should send a 404 response
       if (!post_details) return done(404);

       //Now we will execute another db interaction
       //to get the likes

       /**
        * 
        * II-) For the 2nd DB interaction : Retrieve the array of likes 
        * To get the likes for the post. we will execute another database interaction. 
        * 1.This database interaction will return multiple results (i.e: There can be multiple likes on a post),
        * 2.so we will us the db.each() function.
        */


       //Create the sql query by selecting  the users data  from the users(u) table and the likes (l) table
      // where we required the users to enter the likes'post_id 
     //and the likes'user_id got the same value as the users'user_id
     const sql =`SELECT u.user_id, u.first_name, u.last_name, u.username
                    FROM users u, likes l
                    WHERE l.post_id=?
                    AND l.user_id=u.user_id`;
    const likes =[]; // Create an empty array variable to store the likes in  
    /**
     * The db.each() function takes in 4 parameters :
     * 1.The SQL statement to execute
     * 2.The parameters to be passed into the SQL statement 
     * 3.A function that will executed for each row
     * 4.A function that will be executed onceeach row has been operated on  
     */
    db.each(
        sql,              //The SQL statement to execute
        [post_id],       //Parameters - get likes for posts with this ID
        (err,row) => {  // Execute this function for each like  

            //For each row , check the errors and refer them ip to the controller if there are any.
            if(err) return done(err);

            //If there are no errors , then we add each like to array variable (likes)  
            likes.push({
                user_id : row.user_id,
                first_name : row.first_name,
                last_name: row.last_name,
                username: row.username 
            })
           
        },
        //Once all of the rows have been processed,we check again for any errors.
        (err, num_rows) => { //Execute this function once finished
            //For each row, check the errors and refer them up to the controller if there are any
            if (err) return done(err);

            //If there are no error , then we return all of our data up to the controller , leaving the error parameter null.
            return done(null, {
                post_id: post_details.post_id,
                timestamp: post_details.date_published,
                text: post_details.text,
                author: {
                    user_id: post_details.user_id,
                    first_name: post_details.first_name,
                    last_name: post_details.last_name,
                    username: post_details.username
                },
                likes: likes
            })

        })

   })

}

//Let's implement the update post end-point.
//Create a new function called updatePost and implement it

const updatePost = (post_id, new_text, done) => {
    //Define the SQL query to update data, setting the 'text' column to the value in the request body
    //where 'post_id' matches the given 'id'
    const sql = 'UPDATE posts SET text=? WHERE post_id=?';

    //Execute the database using db.run method
    db.run(sql, [new_text, post_id], function (err) {
        if (err) {
           console.error(err);
            return done(err);
        }
        /**
         * Let's  Check if any rows were affected by the update
         * 1.Set a condition using the "changes " property provided by the SQLite property
         * Usage of this property: it represents the number of rows affected the execution of the database using "db.run()" method
         * When updating the posts , the "changes" property will be 0 if no rows were updated and  callback will render "Post Not Found"
         */
        //If any rows were affected were made successfully, return null if no error
        return done(err);
    });
   
}
////////////////////////////////////////////////////////////
//Let's implement the delete post end-point .
//Create a new function called deletePost and implement it
/**
 * We execute a simple DELETE statement by : looking after the sought post_id 
 */
const deletePost = (post_id,user_id, done) => {
    //Define the SQL query to delete data , from the posts table where 'post_id' matches the given 'id'
    
    const sql ='DELETE  FROM posts WHERE post_id=? AND author_id=? '
    /**
     * The db.run() - executes a command on the  db (In this case DELETE)
     * The run() function takes 3 parameters :
     * 1.The sql statement to execute
     * 2.An array of parameters ([post_id]) to fill in the placeholders in the SQL query.
     * 3. A callback function (err) to handle the response.
     */
    db.run(sql,[post_id, user_id],(err) => {
        if(err) {
            return done(err);
        }
        return done(err);
    })
    
}

//Create a function called likePost.
const likePost = (post_id, user_id, done) =>{
    //Let's check if the post exists in the database
    //Define the query to select all the columns From the table post where we required the user to enter the post_id
    const CheckIfPostExistsql ='SELECT * FROM posts WHERE post_id = ?'
    //Execute the Databse using db.get() method
    db.get(CheckIfPostExistsql, [post_id], (err, row) => {
        if(err){
            console.log(err);
            return done(err);
        } else if (!row) { //if the post does not exist , return a 404 error 
            return done(404)
        }
        //If the post exists, add the like on the post
        const Likesql = 'INSERT INTO likes (post_id, user_id) VALUES (?, ?)';
        //Execute the database using db.run() method
        db.run(Likesql, [post_id, user_id], (err) => {
            //i f any errors occurs , pass the error to the callback "done"
            //if (err) {
                //console.log(err);
                //return done(err);
            //}
            if (this.changes ===0){
                return done(true);
            }

            //Successfully add the like on the post 
            return done(err);


        });
    })

    

}


//Create a new function called unlikePost and implement it
const unlikePost = function(post_id, user_id, done) {

    //Let's check if the post exists in the database
    // Define the query to select all the columns From the table post where we required the user to enter the post_id

    const CheckIfPostExistsql = 'SELECT * FROM posts WHERE post_id = ?'
    //Execute the Databse using db.get() method
    db.get(CheckIfPostExistsql, [post_id], (err, row) => {
        if (err) {
            console.log(err);
            return done(err);
        } else if (!row) { //if the post does not exist , return a 404 error 
            return done(404)
        }
        //Define the SQL query to delete data , from the posts table where 'post_id' matches the given 'id'
        const unlikesql = 'DELETE  FROM likes WHERE post_id=? AND user_id=?';
        db.run(unlikesql, [post_id, user_id], function (err) {
            /**
             * Let's check if any rows were affected when  the user remove a like on the post  by using the "changes" property from the SQLite libary 
             * Usage of the "Changes property " : represent the number of rows affected by the executing of the database with teh "db.run()"method
             * If no rows were affected (changes === 0), it indicates that the like removal was unsuccessful, and the callback will be triggered with  'true'.
             *
             */
            if (this.changes === 0) return done(true); //
            return done(err);

        });
    })
    
    

}


//Exports the function "addNewPost" so it can be seen by other files (i.e: the controller)
//Exports the function "getSinglePost" so it can be seen by other files (i.e: the controller)
//Exports the function "updatePost" so it can be seen by other files (i.e: the controller)
//Exports the function "deletePost " so it can be seen by other files(i.e: the controller)
module.exports = {
    addNewPost:addNewPost,
    getSinglePost:getSinglePost,
    updatePost: updatePost,
    deletePost: deletePost,
    likePost: likePost,
    unlikePost: unlikePost
}

