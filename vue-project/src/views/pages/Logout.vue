<template>
    <hr />
    <div class="logout-container">
        <h1>Logout Page</h1>
        <div class="message-ForUser">
            <p class="chirrup-Design message">Thank you for using Chirrup! If you ever decide to return, we will be
                here for you. Have a great day!</p>
        </div>
        <button @click="handleLogout" class="Logout-button">Logout</button>
    </div>
</template>

<script>
import { userService } from "../../services/user.service";

export default {
    data() {
        return {
            error: null,
            submitted: false,
        };
    },
    methods: {
        handleLogout() {
            userService
                .logout()
                .then(() => {
                    console.log("Logout successful");
                    this.$router.push("/login");
                })
                .catch((error) => {
                    this.error = error;
                    this.submitted = false;
                    console.error("Logout error:", error);
                });
        },
    },
};
</script>

<style scoped>
.logout-container {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
}

.message-ForUser {
    border: 3px solid green;
    padding: 10px;
    margin: 15px 0;
}

.chirrup-Design {
    border: 2px solid white;
    padding: 10px;
}

.message {
    font-size: 25px;
}

.Logout-button {
    background-color: red;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

/* Responsiveness */
@media only screen and (max-width: 768px) {
    .logout-container {
        padding: 15px;
    }

    .message-ForUser {
        border-width: 1px;
    }

    .Logout-button {
        padding: 8px 16px;
    }
}

@media only screen and (max-width: 480px) {
    .logout-container {
        max-width: 100%;
    }
}
</style>
