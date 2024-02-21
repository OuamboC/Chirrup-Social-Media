<template>
    <div>
        <em v-if="post.loading">Loading post...</em>
        <div v-else>
            <p>Author: {{ post.author.first_name + " " + post.author.last_name }}</p>
            <hr />
            <p>Text: {{ post.text }}</p>
            <button @click="likePost" v-if="!DoTheUserLikedPost()" class="like-button">Like</button>
            <button @click="unlikePost" v-if="!DoTheUserLikedPost()" class="unlike-button">UnLike</button>
            <hr />
            <p>Date: {{ post.timestamp }}</p>
            <hr />
            <p>Number of Likes: {{ post.likes.length }}</p>
            <hr />
            <button @click="DeletePost" class="Delete-button">Delete</button>
            <button @click="EditPost" class="Edit-button">Edit</button>
            <!-- <p>All post info (for debugging during the development):</p>
            <p>{{ post }}</p>  -->
        </div>

        <div v-if="error">
            {{ error }}
        </div>
    </div>
</template>
<script>
import { postService } from '../../services/posts.service';
import { authPostService } from "../../services/auth.post.service";

export default {
    data() {
        return {
            post: {},
            error: "",
            user: {
                id: localStorage.getItem("user_id")

            },
            post_id: this.$route.params.id,
        }
    },
    methods: {
        //Linear Search (for loop ) to check if the login user liked the post 
        DoTheUserLikedPost() {
            // Loop through each like in the post's likes array
            for (let i = 0; i < this.post.likes.length; i++) {
                const like = this.post.likes[i];
                if (like.user_id === this.user.id) {
                    return true; // The user liked the post
                }
            }
            return false; // The user didn't like the post
        },
        likePost() {
            authPostService.likePosts(this.$route.params.id)
                .then(() => {

                    console.log("Post liked!!");
                    alert("Congratulations! You are Liked this post .");

                })
                .catch(error => {
                    this.error = error;
                    alert(" Error: Failed to like the post.");

                });
        },
        unlikePost() {
            authPostService.unlikePosts(this.$route.params.id)
                .then(() => {

                    console.log("Post unliked!!");
                    alert("Congratulations! You are remove your Like on  this post .");
                })
                .catch(error => {
                    this.error = error;
                    alert(" Error: Failed to unlike the post.");

                });
        },
        DeletePost() {
            authPostService.deletePosts(this.$route.params.id)
                .then(() => {

                    console.log("Post Delete!!");
                    alert(" You Delete your post .");
                })
                .catch(error => {
                    this.error = error;
                    alert(" Error: Failed to delete the post.");

                });

        },
        EditPost() {
            authPostService.updatePosts(this.$route.params.id, this.post.text)
                .then(() => {

                    //Redirect the User to the EditPostText page 
                    this.$router.push('/posts/' + this.$route.params.id + '/update');
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("Error: You can't edit  the post.");
                });

        }

    },

    created() {
        this.post.loading = true;

        postService.getposts(this.$route.params.id)
            .then((post) => {
                this.post = post;
            })
            .catch(error => this.error = error);

    }
}
</script>

<style scoped>
.like-button,
.unlike-button,
.Delete-button,
.Edit-button {
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    margin: 5px;
    color: white;
}

.like-button,
.Delete-button {
    background: green;
}

.unlike-button,
.Edit-button {
    background: red;
}
</style>