import { apiUrl, networkErrorMessage } from "../config";

const postusers = (first_name, last_name, username, password) => {
  return fetch(apiUrl("/users"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: first_name,
      last_name: last_name,
      username: username,
      password: password,
    }),
  })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.json();
      } else if (response.status === 400) {
        throw "Bad request";
      } else {
        throw "Something went wrong ";
      }
    })
    .then((rJson) => {
      console.log("📝 SignUp response:", rJson);
      if (!rJson.user_id) {
        console.error("❌ Backend did not return user_id! Response:", rJson);
      }
      localStorage.setItem("user_id", rJson.user_id);
      console.log("💾 Saved to localStorage - user_id:", rJson.user_id);
      return rJson;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(networkErrorMessage(err));
    });
};

const login = (username, password) => {
  return fetch(apiUrl("/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 400) {
        throw "Bad request";
      } else {
        throw "Something went wrong";
      }
    })
    .then((rJson) => {
      console.log("🔐 Login response:", rJson);
      if (!rJson.user_id) {
        console.error("❌ Backend did not return user_id! Response:", rJson);
      }
      localStorage.setItem("user_id", rJson.user_id);
      localStorage.setItem("session_token", rJson.session_token);
      console.log("💾 Saved to localStorage - user_id:", rJson.user_id);
      return rJson;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(networkErrorMessage(err));
    });
};
const logout = () => {
  return fetch(apiUrl("/logout"), {
    method: "POST", // Specify the HTTP method
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": localStorage.getItem("session_token"),
    },
  })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("user_id");
        localStorage.removeItem("session_token");
        return;
      } else if (response.status === 401) {
        throw "Not logged in";
      } else {
        throw "Something went wrong";
      }
    })
    .catch((error) => {
      console.log("Error:", error);
      return Promise.reject(networkErrorMessage(error));
    });
};

export const userService = {
  login,
  logout,
  postusers,
};
