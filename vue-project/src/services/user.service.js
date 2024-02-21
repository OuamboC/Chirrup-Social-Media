const postusers = (first_name, last_name, username, password) => {
    return fetch("http://localhost:3333/users",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "first_name": first_name,
                "last_name": last_name,
                "username": username,
                "password": password
            })
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 400) {
                throw 'Bad request';
            } else {
                throw 'Something went wrong '
            }
        })
        .then(rJson => {
            localStorage.setItem("user_id", rJson.user_id);
            return rJson
        })
        .catch(err => {
            console.log(err);
            return Promise.reject(err)
        })
};

const login = (username, password) => {
    return fetch("http://localhost:3333/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 400) {
                throw 'Bad request';
            } else {
                throw 'Something went wrong'
            }
        })
        .then(rJson => {
            localStorage.setItem("user_id", rJson.user_id);
            localStorage.setItem("session_token", rJson.session_token);
            return rJson
        })
        .catch(err => {
            console.log(err);
            return Promise.reject(err)
        })
};
const logout = () => {
    return fetch("http://localhost:3333/logout", {
        method: "POST", // Specify the HTTP method
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": localStorage.getItem("session_token")
        }
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
            return Promise.reject(error);
        });
};



export const userService = {
    login,
    logout,
    postusers

}