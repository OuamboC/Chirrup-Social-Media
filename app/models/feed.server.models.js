// The variable "db" stores the database of the app
const db = require("../../database");

// Function to get a user's feed
const getfeedUser = (user_id, done) => {
    const user = {};

    // If there's no logged-in user, return a list of all posts
    if (!user_id) {
        getAllPosts((err, allPosts) => {
            if (err) return done(err);
            user.allPosts = allPosts;
            return done(null, user);
        });
    } else {
        // Handle the case when there is a logged-in user
        FollowerInfo(user_id, (err, followers) => {
            if (err) return done(err);

            // Retrieve posts by the logged-in user
            getPostsByUserId(user_id, (err, userPosts) => {
                if (err) return done(err);

                user.followers = followers;
                user.allPosts = userPosts;

                return done(null, user);
            });
        });
    }
};

// Create a function to retrieve posts by user_id
const getPostsByUserId = (user_id, done) => {
    

    const userPostSql = `SELECT p.post_id, p.date_published, p.text, p.author_id,
                         u.user_id, u.first_name, u.last_name, u.username
                         FROM posts p
                         INNER JOIN users u
                         ON p.author_id = u.user_id
                         WHERE p.author_id = ?
                         ORDER BY p.date_published DESC`;

    const userPosts = [];

    db.each(userPostSql, [user_id], function (err, post_details) {
        if (err) {
            return done(err);
        }

        userPosts.push({
            post_id: post_details.post_id,
            timestamp: post_details.date_published,
            text: post_details.text,
            author_id: post_details.author_id,
            likes: [],  
            author: {
                user_id: post_details.user_id,
                first_name: post_details.first_name,
                last_name: post_details.last_name,
                username: post_details.username
            }
        });
    }, function (err) {
        if (err) {
            return done(err);
        }

        done(null, userPosts);
    });
};

// Create a function to retrieve follower details
const FollowerInfo = (user_id, done) => {
    // Define the query to retrieve the follower details
    const Followersql = `SELECT f.user_id,f.follower_id, u.user_id, u.first_name, u.last_name, u.username,
                        p.post_id, p.date_published, p.text, p.author_id
                        FROM followers f
                         INNER JOIN users u
                         ON f.follower_id=u.user_id
                         INNER JOIN posts p
                         ON p.author_id =u.user_id
                        WHERE f.user_id =?
                        ORDER BY p.date_published DESC`;

    const followers = [];

    // Execute the DB using db.each() function
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
};

// Function to get all posts
const getAllPosts = (done) => {
    const AllPostsql = `SELECT p.post_id, p.date_published, p.text, p.author_id, u.user_id, u.first_name, u.last_name, u.username
                         FROM posts p
                         INNER JOIN users u
                         ON p.author_id = u.user_id
                         ORDER BY  p.date_published DESC`;
    const allPost = [];

    // Execute the DB using the db.each() function
    db.each(AllPostsql, [], function (err, post_details) {
        if (err) {
            return done(404);
        } else if (!post_details) {
            return done(404);
        }

        allPost.push({
            post_id: post_details.post_id,
            timestamp: post_details.date_published,
            text: post_details.text,
            author: {
                user_id: post_details.user_id,
                first_name: post_details.first_name,
                last_name: post_details.last_name,
                username: post_details.username
            },
            likes: []
        });
    }, function (err) {
        if (err) {
            return done(err);
        }

        done(null, allPost);
    });
};


module.exports = {
    getfeedUser: getfeedUser,
    getAllPosts: getAllPosts
};


