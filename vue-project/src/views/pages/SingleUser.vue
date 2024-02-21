<template>
    <div>
        <!-- Header -->
        <h1>User Information</h1>

        <!-- Loading User.... -->
        <div v-if="loading">
            <em>Loading User...</em>
        </div>

        <!-- User Data Display-->
        <div v-else-if="user">
            <!-- User Details -->
            <h3>{{ user.first_name }} {{ user.last_name }}</h3>
            <p>Username: {{ user.username }}</p>
            <p>User ID: {{ user.user_id }}</p>

            <!-- Follow/Unfollow Buttons -->
            <div class="FollowandUnFollowbuttons">
                <button @click="FollowUser" v-if="!DoTheUserFollowThisUser()" class="follow-button">Follow</button>
                <button @click="UnFollowUser" v-if="!DoTheUserFollowThisUser()" class="unfollow-button">Unfollow</button>
            </div>

            <!-- Followers Section -->
            <h4>Followers:</h4>
            <ul v-if="user.followers.length">
                <li v-for="follower in user.followers" :key="follower.user_id">
                    {{ follower.first_name }} {{ follower.last_name }} ({{ follower.username }})
                </li>
            </ul>
            <p v-else>No followers.</p>

            <!-- Following Section -->
            <h4>Following:</h4>
            <ul v-if="user.following.length">
                <li v-for="followingUser in user.following" :key="followingUser.user_id">
                    {{ followingUser.first_name }} {{ followingUser.last_name }} ({{ followingUser.username }})
                </li>
            </ul>
            <p v-else>Not following anyone.</p>

            <!-- User's Posts Section -->
            <h4>Posts:</h4>
            <ul v-if="user.posts.length">
                <li v-for="post in user.posts" :key="post.post_id">
                    <!-- Post Details -->
                    <h5>{{ post.text }}</h5>
                    <p>Post ID: {{ post.post_id }}</p>
                    <p>Timestamp: {{ post.timestamp }}</p>
                    <p>Author: {{ post.author.first_name }} {{ post.author.last_name }} ({{ post.author.username }})</p>

                    <!-- Likes Section -->
                    <h6>Likes:</h6>
                    <ul v-if="post.likes.length">
                        <li v-for="like in post.likes" :key="like.user_id">
                            {{ like.first_name }} {{ like.last_name }} ({{ like.username }})
                        </li>
                    </ul>
                    <p v-else>No likes yet.</p>
                </li>
            </ul>
            <p v-else>No posts available.</p>
        </div>

        <!-- Error Display -->
        <p v-else>Loading user information...</p>
        <p v-if="error">Error: {{ error }}</p>
    </div>
</template>

<script>
import { postService } from '../../services/posts.service';
import { authSocialService } from '../../services/auth.social.service'

export default {
    data() {
        return {
            user: {}, // Start with an empty object
            loading: true,
            error: ""
        };
    },
    methods: {
        //Linear search (for loop ) to check if the  login user is being followed by any other users.
        DoTheUserFollowThisUser() {
            // Loop through each follower in the user's followers array
            for (let i = 0; i < this.user.followers.length; i++) {
                const follower = this.user.followers[i];
                if (follower.user_id === this.$route.params.id) {
                    return true; // The user is being followed
                }
            }
            return false; //The user is not being followed
        },
        FollowUser() {
            authSocialService.postFollowUser(this.$route.params.id)
                .then(() => {
                    console.log("You just Follow this User");
                    alert("Congratulations! You are now following this user.");
                })
                .catch(error => {
                    this.error = error;
                    alert(" Error: Failed to follow this user.");

                });
        },
        UnFollowUser() {
            authSocialService.deleteFollowUser(this.$route.params.id)
                .then(() => {
                    console.log("You just unFollow this User");
                    alert("Congratulations! You are now ufollowing this user.");
                })
                .catch(error => {
                    this.error = error;
                    alert(" Error: Failed to unfollow this user.");

                });
        },

    },
    created() {
        // Fetch user data when the component is created
        postService
            .getusers(this.$route.params.id)
            .then((user) => {
                // Update user data and turn off loading indicator on success
                this.user = user;
                this.loading = false;
            })
            .catch((error) => {
                // Handle errors and turn off loading indicator
                this.error = error;
                this.loading = false;
            });
    },
};
</script>
<style scoped >
.FollowandUnFollowbuttons {
    display: flex;
}

.follow-button,
.unfollow-button {
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    margin: 5px;
    color: white;
}

.follow-button {
    background: green;
}

.unfollow-button {
    background: red;
}
</style>

