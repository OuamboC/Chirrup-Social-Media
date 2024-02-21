<template>
    <div>
        <form @submit.prevent="handleSubmit" class="searchForm">
            <label for="Search">{{ search_information }} </label>
            <div class="searchInput">
                <input type="text" v-model="input" placeholder="Search for User_details" />
                <button>Search</button>
            </div>
        </form>

        <!-- Display search results -->
        <ul v-if="search.length">
            <li v-for="result in search" :key="result.user_id">
                <!-- Display user information -->
                <h4>{{ result.first_name }} {{ result.last_name }}</h4>

                <p>Username: {{ result.username }}</p>

                <!-- Link to SingleUser page -->
                <router-link :to="'/users/' + result.user_id" target="_blank">
                    View User Details
                </router-link>
            </li>
        </ul>
        <p v-else>No search results.</p>
    </div>
</template>

<script>
import { postService } from '../../services/posts.service'

export default {
    data() {
        return {
            search_information: "Search Information",
            input: "",
            submitted: false,
            search: [], // Array to store search results
            error: ""
        };
    },


    methods: {

        handleSubmit() {

            postService.getsearch(this.$route.params.id)
                .then(results => {
                    this.submitted = true;
                    this.search = results;

                    // Redirect to the search page
                    this.$router.push("/search");
                })
                .catch(error => {
                    console.error("Error during search:", error);

                });

        },

    },

};
</script>

<style scoped>
/* Responsiveness of  Search Form */
.searchForm {
    max-width: 600px;
    margin: 20px auto;
    padding: 15px;
    background-color: #f0f0f0;
    border-radius: 5px;
}

.searchInput {
    display: flex;
}

.searchInput input {
    flex: 1;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.searchInput button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.searchInput button:hover {
    background-color: #333;
}

.searchInput button:active {
    background-color: #1a1a1a;
}
</style>
