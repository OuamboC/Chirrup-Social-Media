/**
 * Inserts the same demo users/posts as the assignment test fixtures when the DB
 * is still empty (typical first boot on Render). Disable with SEED_DEMO_DATA=0.
 * Called from database.js after all tables are created (avoid races with parallel DDL).
 */
"use strict";

const path = require("path");
const db = require("../database");
const users = require("../app/models/user.server.models");
const posts = require("../app/models/post.server.models");

const goodUsers = require(path.join(__dirname, "../tests/data/good_user_data.json"));
const goodPosts = require(path.join(__dirname, "../tests/data/good_post_data.json"));

function countRows(sql) {
  return new Promise((resolve, reject) => {
    db.get(sql, [], (err, row) => {
      if (err) return reject(err);
      resolve(row.c);
    });
  });
}

function addUser(user) {
  return new Promise((resolve, reject) => {
    users.addNewUser(user, (err, id) => (err ? reject(err) : resolve(id)));
  });
}

function addPost(authorId, text) {
  return new Promise((resolve, reject) => {
    posts.addNewPost(authorId, { text }, (err, id) => (err ? reject(err) : resolve(id)));
  });
}

async function seedDemoIfEmpty() {
  if (process.env.SEED_DEMO_DATA === "false" || process.env.SEED_DEMO_DATA === "0") {
    console.log("SEED_DEMO_DATA disabled; skipping demo seed.");
    return;
  }
  const nUsers = await countRows("SELECT COUNT(*) AS c FROM users");
  const nPosts = await countRows("SELECT COUNT(*) AS c FROM posts");
  if (nUsers > 0 || nPosts > 0) {
    return;
  }
  console.log(
    "Empty database: seeding demo users and posts (assignment test fixtures)."
  );
  for (const u of goodUsers) {
    await addUser(u);
  }
  const firstAuthorId = 1;
  for (const p of goodPosts) {
    await addPost(firstAuthorId, p.text);
  }
  console.log("Demo seed finished.");
}

module.exports = { seedDemoIfEmpty };
