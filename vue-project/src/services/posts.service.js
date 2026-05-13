import { apiUrl, networkErrorMessage } from "../config";

const getFeed = () => {
    return fetch(apiUrl("/feed"))
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
       return resJson
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

const getsearch = () => {
    return fetch(apiUrl("/search"))
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 400) {
                throw 'Bad Request';
            } else {
                throw "Something went wrong"
            }
        })
        .then(rJson => {
            //use getItem to retrieve data from localStorage
            const user_id= localStorage.getItem("user_id");
            const first_name = localStorage.getItem("first_name");
            const last_name = localStorage.getItem("last_name");
            const username = localStorage.getItem("username");

            console.log(user_id, first_name, last_name, username);
            
            return rJson
        })
        .catch((error) => {
            console.log("Err", error);
            return Promise.reject(networkErrorMessage(error))
        })
};



export const postService = {
    getFeed,
    getPosts,
    getusers,
    getsearch
    
}