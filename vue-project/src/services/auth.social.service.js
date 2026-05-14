import { apiUrl, networkErrorMessage, jsonErrorDetail } from "../config";

const postFollowUser = (user_id) => {
  return fetch(apiUrl("/users/" + user_id + "/follow"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": localStorage.getItem("session_token"),
    },
  })
    .then(async (response) => {
      if (response.status === 200) {
        return "OK";
      }
      const detail = await jsonErrorDetail(response);
      if (response.status === 401) {
        throw "Not logged in";
      }
      if (response.status === 403) {
        throw "You can not follow a User the User twice ";
      }
      if (response.status === 404) {
        throw "User not found";
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

const deleteFollowUser = (user_id) => {
  return fetch(apiUrl("/users/" + user_id + "/follow"), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": localStorage.getItem("session_token"),
    },
  })
    .then(async (response) => {
      if (response.status === 200) {
        return "OK";
      }
      const detail = await jsonErrorDetail(response);
      if (response.status === 401) {
        throw "Not logged in";
      }
      if (response.status === 403) {
        throw "You can not unfollow a User that you are not following ";
      }
      if (response.status === 404) {
        throw "User not found";
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
export const authSocialService = {
  postFollowUser,
  deleteFollowUser,
};
