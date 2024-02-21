<template>
    <hr/>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="handleSubmit" class="login-form">
            <label for="username">Enter Your username: </label>
            <input type="text" name="username" v-model="username" required>
            <div v-show="submitted && !username">Username is required</div>
            <br /><br />
            <label for="password">Password: </label>
            <input type="password" name="password" v-model="password" required>
            <div v-show="submitted && !password">Password is required</div>

            <br /><br />

            <button type="submit" class="Login-button">Login</button>
            <div v-if="error" class="error-message">{{ error }}</div>
        </form>



    </div>
</template>

<script>
import { userService } from "../../services/user.service";

export default {
    data() {
        return {
            username: "",
            password: "",
            error: "",
            submitted: false,
        };
    },
    methods: {
        handleSubmit() {
            this.error = "";
            this.submitted = true;
            const { username, password } = this;

            if (!(username && password)) {
                return;
            }

            // Call the login method from your user service
            userService
                .login(username, password)
                .then(() => {
                    console.log("Auth successful");
                    // Redirect to the Home page after successful login
                    this.$router.push("/");
                })
                .catch((error) => {
                    this.error = error;
                    this.submitted = false;
                });
        },
    },
};
</script>
<style scoped>
.login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 0 15px;
}

.Login-button {
    background-color: green;
    width: 100%;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

}

.Login-button:hover {
    background-color: #45a049;

}

.error-message {
    color: red;
    margin-top: 10px;
}



/* Responsiveness */
@media screen and (max-width: 768px) {
    .login-form {
        max-width: 100%;
    }
}
</style>


