<template>
    <hr/>
    <div>
        <form @submit.prevent="handleSubmit" class="signup-form">
            <label for="first_name">Enter Your First Name: </label>
            <input type="text" name="first_name" v-model="first_name" required>
            <div v-show="submitted && !first_name">First name is required</div>
            <br /><br />

            <label for="last_name">Enter Your Last Name: </label>
            <input type="text" name="last_name" v-model="last_name" required>
            <div v-show="submitted && !last_name">Last name is required</div>
            <br /><br />

            <label for="username">Enter Your username: </label>
            <input type="text" name="username" v-model="username" required>
            <div v-show="submitted && !username">Username is required</div>
            <br /><br />

            <label for="password">Enter Your Password: </label>
            <input type="password" name="password" v-model="password" required>
            <div v-show="submitted && !password">Password is required</div>

            <br /><br />

            <button type="submit" class="Signup-button">SignUp</button>
        </form>
    </div>
</template>

<script>
import { userService } from "../../services/user.service";

export default {
    data() {
        return {
            first_name: "",
            last_name: "",
            username: "",
            password: "",
            submitted: false,
        };
    },
    methods: {
        handleSubmit() {
            this.submitted = true;
            const { first_name, last_name, username, password } = this;

            if (!(first_name && last_name && username && password)) {
                return;
            }

            userService
                .postusers(first_name, last_name, username, password)
                .then(() => {
                    console.log("Signup successful");
                    // Redirect to the login page after successful signup
                    this.$router.push("/login");
                })
                .catch((error) => {
                    console.error("Signup failed", error);
                    this.submitted = false;
                });
        },
    },
};
</script>
<style scoped>
.signup-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 0 15px;
}

.Signup-button {
    background-color: green;

    color: white;
    /* White text */
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;

}

.Signup-button:hover {
    background-color: #2980b9;
    /* Darker blue on hover */
}

/* Responsiveness */
@media screen and (max-width: 768px) {
    .signup-form {
        max-width: 100%;
    }
}
</style>
