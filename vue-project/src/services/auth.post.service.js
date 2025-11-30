const postPosts = (text) => {
  return fetch("http://localhost:3333/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": localStorage.getItem("session_token"),
    },
    body: JSON.stringify({
      text: text,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else if (response.status === 400) {
        throw "Bad request";
      } else if (response.status === 401) {
        throw "Not logged in";
      } else {
        throw "Something went wrong";
      }
    })
    .then((rJson) => {
      console.log("✅ Post created:", rJson);
      // Don't overwrite user_id - it should stay from login!
      return rJson;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};
const updatePosts = (post_id, text) => {
  return fetch(
    "http://localhost:3333/posts/" + post_id, //+ "/update"
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": localStorage.getItem("session_token"),
      },
      body: JSON.stringify({
        text: text,
      }),
    }
  )
    .then((response) => {
      if (response.status === 200) {
        //return response.json();
        return "OK";
      } else if (response.status === 400) {
        throw "Bad request";
      } else if (response.status === 401) {
        throw "Not logged in";
      } else if (response.status === 403) {
        throw "You can only edit your own post";
      } else {
        throw "Something went wrong";
      }
    })
    .then((rJson) => {
      return rJson;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};
const deletePosts = (post_id) => {
  return fetch(
    "http://localhost:3333/posts/" + post_id, //+ "/delete"
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": localStorage.getItem("session_token"),
      },
    }
  )
    .then((response) => {
      if (response.status === 200) {
        //return response.json();
        return "OK";
      } else if (response.status === 401) {
        throw "Not logged in";
      } else if (response.status === 403) {
        throw "You can only delete your own post";
      } else {
        throw "Something went wrong";
      }
    })
    .then((rJson) => {
      return rJson;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

const likePosts = (post_id) => {
  return fetch("http://localhost:3333/posts/" + post_id + "/like", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": localStorage.getItem("session_token"),
    },
  })
    .then((response) => {
      if (response.status === 200) {
        //return response.json();
        return "OK";
      } else if (response.status === 401) {
        throw "Not logged in";
      } else if (response.status === 403) {
        throw "You have already liked this post";
      } else {
        throw "Something went wrong";
      }
    })
    .then((rJson) => {
      return rJson;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

const unlikePosts = (post_id) => {
  return fetch("http://localhost:3333/posts/" + post_id + "/like", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": localStorage.getItem("session_token"),
    },
  })
    .then((response) => {
      if (response.status === 200) {
        //return response.json();
        return "OK";
      } else if (response.status === 401) {
        throw "Not logged in";
      } else if (response.status === 403) {
        throw "You can not unlike a post that you have not liked";
      } else {
        throw "Something went wrong";
      }
    })
    .then((rJson) => {
      return rJson;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

export const authPostService = {
  postPosts,
  updatePosts,
  deletePosts,
  likePosts,
  unlikePosts,
};
