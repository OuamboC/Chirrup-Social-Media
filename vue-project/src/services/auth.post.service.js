import { apiUrl, networkErrorMessage, jsonErrorDetail } from "../config";

const postPosts = (text) => {
  return fetch(apiUrl("/posts"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": localStorage.getItem("session_token"),
    },
    body: JSON.stringify({
      text: text,
    }),
  })
    .then(async (response) => {
      if (response.status === 201) {
        return response.json();
      }
      const detail = await jsonErrorDetail(response);
      if (response.status === 400) {
        throw detail || "Bad request";
      }
      if (response.status === 401) {
        throw "Not logged in";
      }
      throw detail || "Something went wrong";
    })
    .then((rJson) => {
      console.log("✅ Post created:", rJson);
      // Don't overwrite user_id - it should stay from login!
      return rJson;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(networkErrorMessage(err));
    });
};
const updatePosts = (post_id, text) => {
  return fetch(
    apiUrl("/posts/" + post_id),
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
    .then(async (response) => {
      if (response.status === 200) {
        return "OK";
      }
      const detail = await jsonErrorDetail(response);
      if (response.status === 400) {
        throw detail || "Bad request";
      }
      if (response.status === 401) {
        throw "Not logged in";
      }
      if (response.status === 403) {
        throw "You can only edit your own post";
      }
      if (response.status === 404) {
        throw "Post not found";
      }
      throw detail || "Something went wrong";
    })
    .then((rJson) => {
      return rJson;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(networkErrorMessage(err));
    });
};
const deletePosts = (post_id) => {
  return fetch(
    apiUrl("/posts/" + post_id),
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": localStorage.getItem("session_token"),
      },
    }
  )
    .then(async (response) => {
      if (response.status === 200) {
        return "OK";
      }
      const detail = await jsonErrorDetail(response);
      if (response.status === 401) {
        throw "Not logged in";
      }
      if (response.status === 403) {
        throw "You can only delete your own post";
      }
      if (response.status === 404) {
        throw "Post not found";
      }
      throw detail || "Something went wrong";
    })
    .then((rJson) => {
      return rJson;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(networkErrorMessage(err));
    });
};

const likePosts = (post_id) => {
  return fetch(apiUrl("/posts/" + post_id + "/like"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": localStorage.getItem("session_token"),
    },
  })
    .then(async (response) => {
      if (response.status === 200) {
        return "OK";
      } else if (response.status === 401) {
        throw "Not logged in";
      } else if (response.status === 403) {
        throw "You have already liked this post";
      } else if (response.status === 404) {
        throw "Post not found";
      }
      const detail = await jsonErrorDetail(response);
      throw detail || "Something went wrong";
    })
    .then((rJson) => {
      return rJson;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(networkErrorMessage(err));
    });
};

const unlikePosts = (post_id) => {
  return fetch(apiUrl("/posts/" + post_id + "/like"), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": localStorage.getItem("session_token"),
    },
  })
    .then(async (response) => {
      if (response.status === 200) {
        return "OK";
      } else if (response.status === 401) {
        throw "Not logged in";
      } else if (response.status === 403) {
        throw "You can not unlike a post that you have not liked";
      } else if (response.status === 404) {
        throw "Post not found";
      }
      const detail = await jsonErrorDetail(response);
      throw detail || "Something went wrong";
    })
    .then((rJson) => {
      return rJson;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(networkErrorMessage(err));
    });
};

export const authPostService = {
  postPosts,
  updatePosts,
  deletePosts,
  likePosts,
  unlikePosts,
};
