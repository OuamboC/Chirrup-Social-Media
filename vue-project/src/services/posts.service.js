import { apiUrl, networkErrorMessage } from "../config";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Retries help when Render is cold or the Vercel→Render hop times out briefly. */
async function fetchFeedWithRetry(attempts = 3) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fetch(apiUrl("/feed"));
    } catch (e) {
      lastErr = e;
      const canRetry = i < attempts - 1 && e && e.name === "TypeError";
      if (canRetry) {
        await delay(2000 * (i + 1));
        continue;
      }
      throw e;
    }
  }
  throw lastErr;
}

const getFeed = () => {
    return fetchFeedWithRetry()
   .then(async (response) => {
    if (response.status === 200) {
        return response.json();
    }
    const ct = response.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
        try {
            const j = await response.json();
            if (j.error) throw j.error;
            if (j.error_message) throw j.error_message;
        } catch (e) {
            if (typeof e === "string") throw e;
        }
    }
    throw "Something went wrong";
   })
   .then((resJson) => {
       if (!Array.isArray(resJson)) {
         throw new Error(
           "Unexpected feed response (expected a JSON array). The /api proxy may be forwarding to the wrong path on the server."
         );
       }
       return resJson;
   })
   .catch((error) => {
    console.log("Err", error)
    return Promise.reject(networkErrorMessage(error))
   })
};

const getPosts = (post_id) => {
    return fetch(apiUrl("/posts/" + post_id))
    .then((response) => {
    if (response.status === 200){
        return response.json();
    } else if (response.status === 404){
        throw 'Not Found';
    }else{
        throw "Something went wrong"
    }
    })
    .then ((resJson) => {
        return resJson
    })
    .catch((error) => {
        console.log("Err", error)
        return Promise.reject(networkErrorMessage(error))
    })
};

const getusers = (user_id) => {
    return fetch(apiUrl("/users/" + user_id))
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 404) {
                throw 'Not Found';
            } else {
                throw "Something went wrong"
            }
        })
        .then((resJson) => {
            return resJson
        })
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(networkErrorMessage(error))
        })
};

/** @param {string} [query] Search string; empty lists all users (server uses LIKE %q%). */
const getsearch = (query = "") => {
  const q = typeof query === "string" ? query : "";
  const qs = new URLSearchParams();
  qs.set("q", q);
  return fetch(apiUrl(`/search?${qs.toString()}`))
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      if (response.status === 400) {
        throw "Bad Request";
      }
      const ct = response.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        return response.json().then((j) => {
          if (j && j.error) throw j.error;
          if (j && j.error_message) throw j.error_message;
          throw "Something went wrong";
        });
      }
      throw "Something went wrong";
    })
    .then((rJson) => {
      if (!Array.isArray(rJson)) {
        console.warn("search: expected JSON array from /search", rJson);
        return [];
      }
      return rJson;
    })
    .catch((error) => {
      console.log("Err", error);
      return Promise.reject(networkErrorMessage(error));
    });
};



export const postService = {
    getFeed,
    getPosts,
    getusers,
    getsearch
    
}