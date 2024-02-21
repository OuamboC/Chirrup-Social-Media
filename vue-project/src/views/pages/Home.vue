<template>
    <hr/>
    <div>
        <h1>  Chirrup Blog</h1>
        
        <em v-if="loading">Loading posts...</em>

        <ul v-if="posts.length">
            <li v-for="post in posts" :key="post.post_id">
                <router-link :to=" '/posts/' + post.post_id">
                    {{ post.text }}
                </router-link>
            </li>
        </ul>
        <div v-if="error">
            {{ error }}
        </div>
    
    </div>
    
</template>

<script>
import { postService } from "../../services/posts.service"


export default {
    data(){
        return {
           // submitted: false,
            posts: [],
            error: "",
            loading: true
            
        }
    },
    mounted() {
        postService.getFeed()
        .then(posts => {
            this.posts = posts
            this.loading = false
        })
        .catch(error => this.error = error);
    },
    
   
}
</script>

<style scoped >
input {
    display: block;
    width: 250px;
    margin: 0px auto;
    padding: 15px 35px;
    background-size: 15px 15px;
    font-size: 16px;
    border: none;
    border-radius: 25px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>