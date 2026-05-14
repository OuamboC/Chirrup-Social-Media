const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = 'db.sqlite';

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if(err){
        console.log(err.message);
        throw err;
    }else{
        console.log('Connected to the SQLite database.')

        // Queue DDL in order (posts references users; likes/followers reference others).
        // Previously these ran in parallel, which can SQLITE_ERROR on a fresh file.
        db.serialize(() => {
            db.run(`CREATE TABLE users (
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name text,
                last_name text,
                username text UNIQUE,
                password text,
                salt text,
                session_token text,
                CONSTRAINT username_unique UNIQUE (username)
            )`, (err) => {
                if(err){
                    console.log('Users table already created');
                }else{
                    console.log('Users table created');
                }
            });

            db.run(`CREATE TABLE posts (
                post_id INTEGER PRIMARY KEY AUTOINCREMENT,
                text TEXT,
                date_published INTEGER,
                author_id INTEGER,
                FOREIGN KEY(author_id) REFERENCES users(user_id)
            )`, (err) => {
                if(err){
                    console.log('Posts table already created');
                }else{
                    console.log('Posts table created');
                }
            });

            db.run(`CREATE TABLE likes (
                post_id INTEGER,
                user_id INTEGER,
                PRIMARY KEY (post_id, user_id),
                FOREIGN KEY (post_id) REFERENCES posts(post_id),
                FOREIGN KEY (user_id) REFERENCES users(user_id)
            )`, (err) => {
                if(err){
                    console.log('Likes table already created');
                }else{
                    console.log('Likes table created');
                }
            });

            db.run(`CREATE TABLE followers (
                user_id INTEGER,
                follower_id INTEGER,
                PRIMARY KEY (user_id, follower_id),
                FOREIGN KEY (user_id) REFERENCES users(user_id),
                FOREIGN KEY (follower_id) REFERENCES users(user_id)
            )`, (err) => {
                if(err){
                    console.log('Followers table already created');
                }else{
                    console.log('Followers table created');
                }
                try {
                    const { seedDemoIfEmpty } = require('./scripts/seed-demo-if-empty');
                    seedDemoIfEmpty().catch((e) => console.error('Demo seed failed:', e));
                } catch (e) {
                    console.error('Demo seed load failed:', e);
                }
            });
        });
    }
});

module.exports = db;
