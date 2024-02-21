<template>
    <div>
        <form @submit.prevent="handleSubmit" class="TodoForm">
            <label for="Todo">{{ Todo_information }} </label>
            <div class="TodoInput">
                <input type="text" v-model="text" placeholder="Create a post" />
                <button>Create Post</button>
            </div>
        </form>
    </div>
</template>
<script>
import { authPostService } from "../../services/auth.post.service";

export default {
    data() {
        return {
            Todo_information: "Create  A Post",
            text: '',
            submitted: false,
        }
    },
    methods: {
        handleSubmit() {
            authPostService
                .postPosts(this.text)
                .then(() => {
                    console.log("Post added successfully");
                })
                .catch((error) => {
                    console.error("Create Post error:", error);

                });
        }
    }
}
</script>
<style scoped>
/* Responsive TodoForm  */
.TodoForm {
    max-width: 600px;
    margin: 20px auto;
    padding: 15px;
    background-color: #f0f0f0;
    border-radius: 5px;
}

.TodoInput {
    display: flex;
}

.TodoInput input {
    flex: 1;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.TodoInput button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.TodoInput button:hover {
    background-color: #333;
}

.TodoInput button:active {
    background-color: #1a1a1a;
}
</style>
