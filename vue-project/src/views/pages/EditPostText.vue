<template>
    <div>
        <form @submit.prevent="handleSubmit" class="EditForm">
            <label for="Todo">{{ Todo_information }} </label>
            <div class="EditInput">
                <input type="text" v-model="text" placeholder="Edit a post" />
                <button type="submit">Save Changes</button>
            </div>
        </form>
    </div>
</template>

<script>
import { authPostService } from "../../services/auth.post.service";

export default {
    data() {
        return {
            Todo_information: "Edit Post",
            text: '',
            post_id: this.$route.params.id, 
            submitted: false,
        };
    },
    methods: {
       handleSubmit() {
                authPostService.updatePosts(this.post_id, this.text)
                .then(() => {

                    console.log("Post updated successfully");
                    alert("You have successfully edited your post.");
                    // Redirect to the user to the post details page after updating
                    this.$router.push("/posts/" + this.$route.params.id);
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("Error: Failed to edit the post.");
                });
        },

    },
};
</script>
<style scoped>
/* Responsive TodoForm  */
.EditForm {
    max-width: 600px;
    margin: 20px auto;
    padding: 15px;
    background-color: #f0f0f0;
    border-radius: 5px;
}

.EditInput {
    display: flex;
}

.EditInput input {
    flex: 1;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.EditInput button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.EditInput button:hover {
    background-color: #333;
}

.EditInput button:active {
    background-color: #1a1a1a;
}
</style>