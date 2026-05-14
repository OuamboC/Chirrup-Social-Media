import { apiUrl, networkErrorMessage, jsonErrorDetail } from "../config";

/** Clear client auth when the server no longer has this user/session (e.g. DB reset on Render). */
export function clearClientAuth() {
  localStorage.removeItem("user_id");
  localStorage.removeItem("session_token");
}

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
    .then(async (response) => {
      if (response.status === 200 || response.status === 201) {
        return response.json();
      }
      const detail = await jsonErrorDetail(response);
      if (response.status === 400) {
        throw detail || "Bad request";
      }
      throw detail || "Something went wrong";
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
    .then(async (response) => {
      if (response.status === 200) {
        return response.json();
      }
      const detail = await jsonErrorDetail(response);
      if (response.status === 400) {
        throw detail || "Bad request";
      }
      throw detail || "Something went wrong";
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
    .then(async (response) => {
      if (response.status === 200) {
        clearClientAuth();
        return;
      }
      if (response.status === 401) {
        clearClientAuth();
        throw "Not logged in";
      }
      const detail = await jsonErrorDetail(response);
      throw detail || "Something went wrong";
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
