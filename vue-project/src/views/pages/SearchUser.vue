<template>
    <!-- Main Content -->
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <!-- Search Header Section -->
        <div class="bg-gradient-to-r from-blue-600 to-green-600 shadow-lg">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="text-center mb-8">
                    <h1 class="text-4xl font-bold text-white mb-3">Find People</h1>
                    <p class="text-lg text-blue-100">Discover and connect with users on Chirrup</p>
                </div>
                
                <!-- Search Box -->
                <div class="max-w-2xl mx-auto">
                    <form @submit.prevent="handleSubmit" class="relative">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </div>
                        <input 
                            type="text" 
                            v-model="searchQuery"
                            placeholder="Search for users by name or username..." 
                            class="block w-full pl-12 pr-32 py-4 text-gray-900 bg-white border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md hover:shadow-lg transition-all duration-300 text-lg"
                        />
                        <div class="absolute inset-y-0 right-0 flex items-center pr-2">
                            <button 
                                type="submit"
                                :disabled="loading"
                                class="px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span v-if="!loading">Search</span>
                                <span v-else class="flex items-center">
                                    <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Results Section -->
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Results Header -->
            <div v-if="submitted || search.length" class="mb-6">
                <h2 class="text-2xl font-bold text-gray-800">
                    <span class="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                        Search Results
                    </span>
                </h2>
                <p class="text-gray-600 mt-1">
                    {{ search.length }} {{ search.length === 1 ? 'user' : 'users' }} found
                </p>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-16">
                <div class="relative">
                    <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                    <div class="absolute top-0 left-0 h-16 w-16 border-t-4 border-b-4 border-green-600 rounded-full animate-ping opacity-20"></div>
                </div>
                <p class="mt-4 text-gray-600 font-medium text-lg">Searching for users...</p>
            </div>

            <!-- Error State -->
            <div v-if="error" class="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-md mb-6">
                <div class="flex items-center">
                    <svg class="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div>
                        <h3 class="text-red-800 font-semibold text-lg">Error</h3>
                        <p class="text-red-700 mt-1">{{ error }}</p>
                    </div>
                </div>
            </div>

            <!-- User Cards -->
            <div v-if="!loading && search.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                    v-for="result in filteredResults" 
                    :key="result.user_id"
                    class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 group cursor-pointer transform hover:-translate-y-1"
                >
                    <router-link :to="'/users/' + result.user_id" class="block p-6">
                        <div class="flex items-center space-x-4">
                            <!-- Avatar -->
                            <div class="flex-shrink-0">
                                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md group-hover:shadow-lg transition-shadow duration-300">
                                    {{ getInitial(result.username) }}
                                </div>
                            </div>
                            
                            <!-- User Info -->
                            <div class="flex-1 min-w-0">
                                <h3 class="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
                                    {{ result.first_name }} {{ result.last_name }}
                                </h3>
                                <p class="text-gray-600 mb-2 truncate">@{{ result.username }}</p>
                                
                                <!-- View Profile Button -->
                                <span class="inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-green-600 transition-colors duration-200">
                                    View Profile
                                    <svg class="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>

            <!-- Empty State - No Search Yet -->
            <div v-if="!loading && !submitted && search.length === 0" class="text-center py-16">
                <div class="bg-white rounded-xl shadow-md p-12 border border-gray-200">
                    <svg class="w-20 h-20 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    <h3 class="text-2xl font-semibold text-gray-700 mb-2">Find Your Friends</h3>
                    <p class="text-gray-500 text-lg">Search for users to connect with on Chirrup</p>
                </div>
            </div>

            <!-- Empty State - No Results Found -->
            <div v-if="!loading && submitted && search.length === 0" class="text-center py-16">
                <div class="bg-white rounded-xl shadow-md p-12 border border-gray-200">
                    <svg class="w-20 h-20 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                    <h3 class="text-2xl font-semibold text-gray-700 mb-2">No users found</h3>
                    <p class="text-gray-500 text-lg mb-6">Try searching with different keywords</p>
                    <button 
                        @click="clearSearch"
                        class="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Clear Search
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { postService } from '../../services/posts.service'

export default {
    data() {
        return {
            searchQuery: "",
            submitted: false,
            search: [],
            loading: false,
            error: ""
        };
    },
    computed: {
        filteredResults() {
            if (!this.searchQuery.trim()) {
                return this.search;
            }
            
            const query = this.searchQuery.toLowerCase();
            return this.search.filter(user => {
                const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
                const username = user.username.toLowerCase();
                return fullName.includes(query) || username.includes(query);
            });
        }
    },
    mounted() {
        // Load all users on mount
        this.loadAllUsers();
        
        // Check if there's a query parameter
        const urlQuery = this.$route.query.q;
        if (urlQuery) {
            this.searchQuery = urlQuery;
            this.handleSubmit();
        }
    },
    methods: {
        loadAllUsers() {
            postService.getsearch()
                .then(results => {
                    this.search = results;
                })
                .catch(error => {
                    console.error("Error loading users:", error);
                });
        },
        handleSubmit() {
            this.loading = true;
            this.error = "";
            this.submitted = true;

            postService.getsearch()
                .then(results => {
                    this.search = results;
                    this.loading = false;
                })
                .catch(error => {
                    console.error("Error during search:", error);
                    this.error = error || "Failed to search for users";
                    this.loading = false;
                });
        },
        clearSearch() {
            this.searchQuery = "";
            this.submitted = false;
            this.error = "";
            this.loadAllUsers();
        },
        getInitial(username) {
            return username ? username.charAt(0).toUpperCase() : 'U';
        }
    }
};
</script>
