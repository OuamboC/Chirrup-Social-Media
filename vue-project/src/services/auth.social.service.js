const postFollowUser = ( user_id) => {
    return fetch("http://localhost:3333/users/" + user_id +  "/follow",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("session_token")
            },
        })

        .then(response => {
            if (response.status === 200) {
                //return response.json();
                return "You unfollow this User!!!!"
            } else if (response.status === 403) {
                throw "You can not follow a User the User twice ";
            } else {
                throw "Something went wrong";
            }
        })
        .then(rJson => {
            return rJson
        })
        .catch(err => {
            console.log(err);
            return Promise.reject(err)
        });
};

const deleteFollowUser = ( user_id) => {
    return fetch("http://localhost:3333/users/" + user_id + "/follow",
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("session_token")
            },

        })
        .then(response => {
            if (response.status === 200) {
                //return response.json();
                return "You unfollow this User!!!!"
            } else if (response.status === 403) {
                throw "You can not unfollow a User that you are not following ";
            } else {
                throw "Something went wrong";
            }
        })
        .then(rJson => {
            return rJson
        })
        .catch(err => {
            console.log(err);
            return Promise.reject(err)
        });
};
export const authSocialService = {
    postFollowUser,
    deleteFollowUser
    

}