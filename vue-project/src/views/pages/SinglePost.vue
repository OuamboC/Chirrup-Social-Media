<template>
    <!-- Main Content -->
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Back Button -->
            <div class="mb-6">
                <button 
                    @click="$router.back()"
                    class="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                    </svg>
                    <span class="font-medium">Back</span>
                </button>
            </div>

            <!-- Loading State -->
            <div v-if="post.loading" class="flex flex-col items-center justify-center py-16">
                <div class="relative">
                    <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                    <div class="absolute top-0 left-0 h-16 w-16 border-t-4 border-b-4 border-green-600 rounded-full animate-ping opacity-20"></div>
                </div>
                <p class="mt-4 text-gray-600 font-medium text-lg">Loading post...</p>
            </div>

            <!-- Error State -->
            <div v-if="error" class="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-md">
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

            <!-- Post Card -->
            <div v-if="!post.loading && post.text" class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                <!-- Post Header -->
                <div class="bg-gradient-to-r from-blue-600 to-green-600 px-6 py-4">
                    <div class="flex items-center space-x-4">
                        <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <span class="text-2xl font-bold text-blue-600">
                                {{ getInitial(post.author?.username) }}
                            </span>
                        </div>
                        <div class="flex-1">
                            <h2 class="text-xl font-bold text-white">
                                {{ post.author?.first_name }} {{ post.author?.last_name }}
                            </h2>
                            <p class="text-blue-100">@{{ post.author?.username }}</p>
                        </div>
                    </div>
                </div>

                <!-- Post Content -->
                <div class="p-8">
                    <div class="prose max-w-none mb-6">
                        <p class="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
                            {{ post.text }}
                        </p>
                    </div>

                    <!-- Post Meta -->
                    <div class="flex items-center space-x-6 text-sm text-gray-500 pb-6 border-b border-gray-200">
                        <span class="flex items-center">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            {{ formatDate(post.timestamp) }}
                        </span>
                        <span class="flex items-center">
                            <svg class="w-5 h-5 mr-2 text-red-500" :class="{'fill-current': userLikedPost}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                            </svg>
                            {{ post.likes?.length || 0 }} {{ post.likes?.length === 1 ? 'like' : 'likes' }}
                        </span>
                    </div>

                    <!-- Action Buttons -->
                    <div class="pt-6 flex flex-wrap gap-3">
                        <!-- Like/Unlike Button -->
                        <button 
                            v-if="!userLikedPost"
                            @click="likePost"
                            class="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                            </svg>
                            <span>Like</span>
                        </button>

                        <button 
                            v-else
                            @click="unlikePost"
                            class="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <svg class="w-5 h-5 fill-current text-red-500" viewBox="0 0 24 24">
                                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                            </svg>
                            <span>Unlike</span>
                        </button>

                        <!-- Edit Button (Only for post owner) -->
                        <button 
                            v-if="isPostOwner"
                            @click="EditPost"
                            class="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                            <span>Edit Post</span>
                        </button>

                        <!-- Delete Button (Only for post owner) -->
                        <button 
                            v-if="isPostOwner"
                            @click="confirmDelete"
                            class="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                            <span>Delete Post</span>
                        </button>
                    </div>
                </div>

                <!-- Comments Section Placeholder -->
                <div class="bg-gray-50 px-8 py-6 border-t border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                        </svg>
                        Comments
                    </h3>
                    <div class="text-center py-8 text-gray-500">
                        <svg class="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                        </svg>
                        <p>Comments feature coming soon!</p>
                    </div>
                </div>
            </div>

            <!-- Success/Info Messages -->
            <div v-if="successMessage" class="mt-4 bg-green-50 border-l-4 border-green-500 rounded-lg p-4 shadow-md animate-fade-in">
                <div class="flex items-center">
                    <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <p class="text-sm text-green-700 font-medium">{{ successMessage }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { postService } from '../../services/posts.service';
import { authPostService } from "../../services/auth.post.service";

export default {
    data() {
        return {
            post: {
                loading: true
            },
            error: "",
            successMessage: "",
            user: {
                id: localStorage.getItem("user_id")
            },
            post_id: this.$route.params.id,
        }
    },
    computed: {
        userLikedPost() {
            if (!this.post.likes || !Array.isArray(this.post.likes)) {
                return false;
            }
            return this.post.likes.some(like => like.user_id == this.user.id);
        },
        isPostOwner() {
            return this.post.author && this.post.author.user_id == this.user.id;
        }
    },
    methods: {
        likePost() {
            authPostService.likePosts(this.$route.params.id)
                .then(() => {
                    console.log("Post liked!!");
                    this.successMessage = "You liked this post!";
                    this.refreshPost();
                    
                    setTimeout(() => {
                        this.successMessage = "";
                    }, 3000);
                })
                .catch(error => {
                    this.error = error || "Failed to like the post.";
                });
        },
        unlikePost() {
            authPostService.unlikePosts(this.$route.params.id)
                .then(() => {
                    console.log("Post unliked!!");
                    this.successMessage = "You removed your like from this post.";
                    this.refreshPost();
                    
                    setTimeout(() => {
                        this.successMessage = "";
                    }, 3000);
                })
                .catch(error => {
                    this.error = error || "Failed to unlike the post.";
                });
        },
        confirmDelete() {
            if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
                this.DeletePost();
            }
        },
        DeletePost() {
            authPostService.deletePosts(this.$route.params.id)
                .then(() => {
                    console.log("Post deleted!!");
                    this.successMessage = "Post deleted successfully!";
                    
                    setTimeout(() => {
                        this.$router.push('/profile');
                    }, 1500);
                })
                .catch(error => {
                    this.error = error || "Failed to delete the post. You can only delete your own posts.";
                });
        },
        EditPost() {
            this.$router.push('/posts/' + this.$route.params.id + '/update');
        },
        refreshPost() {
            postService.getposts(this.$route.params.id)
                .then((post) => {
                    this.post = post;
                    this.post.loading = false;
                })
                .catch(error => {
                    this.error = error;
                    this.post.loading = false;
                });
        },
        getInitial(username) {
            return username ? username.charAt(0).toUpperCase() : 'U';
        },
        formatDate(timestamp) {
            if (!timestamp) return 'Just now';
            
            const date = new Date(timestamp);
            const now = new Date();
            const diffInSeconds = Math.floor((now - date) / 1000);
            
            if (diffInSeconds < 60) return 'Just now';
            if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
            if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
            if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
            
            return date.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    },
    created() {
        this.refreshPost();
    }
}
</script>
