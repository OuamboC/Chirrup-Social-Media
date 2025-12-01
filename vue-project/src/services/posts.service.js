const getFeed = () => {
    return fetch("https://chirrup-social-media-production.up.railway.app/feed")
   .then((response) => {
    if(response.status === 200){
        return response.json();
    }else{
        throw "Something went wrong"
    }
   })
   .then((resJson) => {
       return resJson
   })
   .catch((error) => {
    console.log("Err", error)
    return Promise.reject(error)
   })
};

const getPosts = (post_id) => {
    return fetch("https://chirrup-social-media-production.up.railway.app/posts/" + post_id)
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
        return Promise.reject(error)
    })
};

const getusers = (user_id) => {
    return fetch("https://chirrup-social-media-production.up.railway.app/users/" + user_id)
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
            return Promise.reject(error)
        })
};

const getsearch = () => {
    return fetch("https://chirrup-social-media-production.up.railway.app/search")
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
            return Promise.reject(error)
        })
};



export const postService = {
    getFeed,
    getPosts,
    getusers,
    getsearch
    
}