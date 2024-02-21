const db = require("../../database");//require in the database

//Get the details of a single User
const getOneUser = (user_id, done) => {
    const user = {};

    // Retrieve user details
    UserInfo(user_id, (err, user_details) => {
        console.log(err, user_details, user_id);
        if (err) return done(err);
        user.user_id = user_details.user_id;
        user.first_name = user_details.first_name;
        user.last_name = user_details.last_name;
        user.username = user_details.username;

        // Retrieve follower details
        FollowerInfo(user_id, (err, follower_details) => {
            console.log(err, follower_details, user_id);
            if (err) return done(err);
            user.followers = follower_details;

            // Retrieve following details
            FollowingInfo(user_id, (err, following_details) => {
                console.log(err, following_details, user_id);
                if (err) return done(err);
                user.following = following_details;

                // Retrieve post details
                PostsLikesInfos(user_id, (err, post_details) => {
                    console.log(err, post_details, user_id);
                    if (err) return done(err);
                    user.posts = post_details;
                    return done(null, user);

                });
            });
        });
    });
};


// Create a function to retrieve user details
const UserInfo = (user_id, done) => {
    // Define the query to retrieve the users details then execute it
    const Usersql = `SELECT user_id, first_name, last_name, username
                     FROM users
                     WHERE user_id = ?`;

    // Execute the database using the db.get() function
    db.get(Usersql, [user_id], function (err, user_details) {
        console.log(err, user_details, [user_id]);
        if (err) {
            return done(err);
        }
        if (!user_details) {
            return done(404);
        }

        return done(null, user_details)
    })
}

// Create a function to retrieve follower details
const FollowerInfo = (user_id, done) => {
    // Define the queries to retrieve the follower details
    const Followersql = `SELECT f.user_id,f.follower_id, u.user_id, u.first_name, u.last_name, u.username
                        FROM followers f
                         INNER JOIN users u
                         ON f.follower_id=u.user_id
                        
                        WHERE f.user_id =?`;

    const followers = [];

    // Execute the DB using db.get() function
    db.each(Followersql, [user_id], function (err, follower_details) {
        console.log(err, follower_details, [user_id]);
        if (err) {
            return done(err);
        }

        followers.push({
            user_id: follower_details.follower_id,
            first_name: follower_details.first_name,
            last_name: follower_details.last_name,
            username: follower_details.username
        });
    }, function (err) {
        if (err) {
            return done(err);
        }
        done(null, followers);
    });
}

// Create a function to retrieve following details
const FollowingInfo = (user_id, done) => {
    // Define the queries to retrieve the follower details
    const Followingsql = `SELECT f.user_id,f.follower_id, u.user_id, u.first_name, u.last_name, u.username
                        FROM followers f
                         INNER JOIN users u
                        ON f.user_id =u.user_id
                        WHERE f.follower_id =?`;

    const following = [];

    // Execute the DB using db.get() function
    db.each(Followingsql, [user_id], function (err, following_details) {
        console.log(err, following_details, [user_id]);
        if (err) {
            return done(err);
        }
        following.push({
            user_id: following_details.user_id,
            first_name: following_details.first_name,
            last_name: following_details.last_name,
            username: following_details.username
        });
    }, function (err) {
        if (err) {
            return done(err);
        }
        done(null, following);
    });
}



const PostsLikesInfos = (user_id, done) => {
    // Define the query to retrieve the post details
    const Postsql = `SELECT p.post_id, p.date_published, p.text, p.author_id, u.user_id, u.first_name, u.last_name, u.username
                    FROM posts p
                    INNER JOIN users u
                    ON p.author_id = u.user_id
                    WHERE p.author_id = ?`;

    const posts = [];

    // Execute the DB using the db.each() function
    db.each(Postsql, [user_id], function (err, post_details) {
        if (err) {
            return done(404);
        } else if (!post_details) {
            return done(404);
        }

        posts.push({
            post_id: post_details.post_id,
            timestamp: post_details.date_published,
            text: post_details.text,
            author: {
                user_id: post_details.user_id,
                first_name: post_details.first_name,
                last_name: post_details.last_name,
                username: post_details.username
            },
            likes: [] // Create an empty array variable to store the likes in 
        });
    }, function (err) {
        if (err) {
            return done(err);
        }

        const sql = `SELECT u.user_id, u.first_name, u.last_name, u.username, p.post_id
                    FROM users u
                    INNER JOIN likes l
                    ON l.user_id=u.user_id
                    INNER JOIN posts p
                    ON p.author_id = u.user_id
                    WHERE p.author_id=?`;

        /**
         * The db.each() function takes in 4 parameters :
         * 1.The SQL statement to execute
         * 2.The parameters to be passed into the SQL statement 
         * 3.A function that will executed for each row
         * 4.A function that will be executed onceeach row has been operated on  
         */
        db.each(
            sql,              //The SQL statement to execute
            [user_id],       //Parameters - get likes for posts with this ID
            (err, row) => {  // Execute this function for each like  

                //For each row , check the errors and refer them ip to the controller if there are any.
                if (err) return done(err);
                /**
                 * let's use the linear search(for loop) to attribute each like to a post
                 * 
                 */
                for (let i = 0; i < posts.length; i++) {
                    if (posts[i].post_id === row.post_id) {
                        //If there are no errors , then we add each like to array variable (likes)  
                        posts[i].likes.push({
                            user_id: row.user_id,
                            first_name: row.first_name,
                            last_name: row.last_name,
                            username: row.username
                        })
                    }
                }

            },
            //Once all of the rows have been processed,we check again for any errors.
            (err, num_rows) => { //Execute this function once finished
                //For each row, check the errors and refer them up to the controller if there are any
                if (err) return done(err);

                done(null, posts);

            })
    });
}


//Follow(Add) a User as friend
const followUser = (follower_id, user_id, done) => {
    console.log("follow request for user_id: " + user_id + " follower_id: " + follower_id);
    // Define the query to check if the post exists
    const checkIfUserExistsSql = 'SELECT * FROM users WHERE user_id = ? ';
    db.get(checkIfUserExistsSql, [user_id], (err, row) => {
        if (err) {
            console.log(err);
            return done(err);
        } else if (!row) {
            return done(404)
        }
        //Define a sql query (via insert query) to add followers in the database
        const addFollowsql = 'INSERT INTO followers ( follower_id, user_id) VALUES (?,?)'
        const values = [follower_id, user_id];
        //Execute the database using the db.run() function

        db.run(addFollowsql, values, function (err, result) {
            console.log(err, result, values)
            if (err) {
                console.log(err);
                return done(err, null);
            } else {
                return done(null, result);
            }
        });
    })


}

//Unfollow (delete) a User as friend
const unfollowUser = (user_id, follower_id, done) => {
    // Define the query to check if the post exists
    const checkIfUserExistsSql = 'SELECT * FROM users WHERE user_id = ? ';
    db.get(checkIfUserExistsSql, [user_id], (err, row) => {
        if (err) {
            console.log(err);
            return done(err);
        } else if (!row) {
            return done(404)
        }
        //Define the sql query (via DELETE query ) to remove data into the database
        //  check if User is being followed 
        // return 403 if the follower isn't followed so we need to first check if the user is being followed, and if not then return 403
        const checkifUserisbeingfollowed = 'SELECT * FROM followers WHERE follower_id =? AND user_id = ?'
        db.get(checkifUserisbeingfollowed, [follower_id, user_id], (err, row) => {
            if (err) {
                console.log(err);
                return done(err);
            } else if (!row) {
                return done(403);
            }
            const sql = 'DELETE from followers WHERE user_id = ? AND follower_id = ?'
            const values = [user_id, follower_id];

            //Execute the database using the db.run functions
            db.run(sql, values, function (err) {
                console.log(err, values)
                if (err) {
                    console.log(err);
                    return done(err);
                }
                return done(null);


            })
        })

    })



}

//Search and retrieve a list of users based on a string query (q)
//if user_id is provided, the search will not considerate the user with that specific id
//Create a function to filter users in the "/search" endpoint
const search_Users = (q, done) => {
    // If user_id is given, include it in the query to exclude that user from the results
    const sql = `SELECT user_id, first_name, last_name, username
                FROM users
               WHERE first_name LIKE ? OR last_name LIKE ? OR username LIKE ? `;

    // '%' : Matches anything such as  the first set of letter of the users
    // q represent the string ( Dann)
    const values = [`%` + q + `%`, `%` + q + `%`, `%` + q + `%`];


    // Execute the database query using db.all() to retrieve multiple results
    db.all(sql, values, function (err, users) {
        // Log any errors and the corresponding query values
        console.log(err, values);

        // If there are no errors, pass the results to the callback function
        if (err) {
            return done(err);
        } else {
            return done(null, users);
        }
    });
};


module.exports = {
    followUser: followUser,
    unfollowUser: unfollowUser,
    search_Users: search_Users,
    getOneUser: getOneUser
}



