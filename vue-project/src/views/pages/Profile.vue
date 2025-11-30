<template>
  <!-- Main Content -->
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50"
  >
    <!-- Profile Header Section -->
    <div class="bg-gradient-to-r from-blue-600 to-green-600 shadow-lg">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          class="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8"
        >
          <!-- Avatar -->
          <div class="flex-shrink-0">
            <div
              class="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white"
            >
              <span class="text-5xl font-bold text-blue-600">
                {{ getInitial(userProfile.username) }}
              </span>
            </div>
          </div>

          <!-- User Info -->
          <div class="flex-1 text-center md:text-left">
            <h1 class="text-4xl font-bold text-white mb-2">
              {{ userProfile.first_name }} {{ userProfile.last_name }}
            </h1>
            <p class="text-xl text-blue-100 mb-4">
              @{{ userProfile.username }}
            </p>

            <!-- User Stats -->
            <div class="flex justify-center md:justify-start space-x-8 mt-6">
              <div class="text-center">
                <div class="text-3xl font-bold text-white">
                  {{ userPosts.length }}
                </div>
                <div class="text-sm text-blue-100">Posts</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">
                  {{ userProfile.followers || 0 }}
                </div>
                <div class="text-sm text-blue-100">Followers</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">
                  {{ userProfile.following || 0 }}
                </div>
                <div class="text-sm text-blue-100">Following</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Posts Section -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Create Post Section -->
      <div
        class="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100"
      >
        <DisplayPosts @post-created="loadUserData" />
      </div>

      <!-- My Posts Header -->
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">
              <span
                class="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
                >My Posts</span
              >
            </h2>
            <p class="text-gray-600">Your thoughts and stories</p>
          </div>
          <button
            @click="loadUserData"
            class="px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center space-x-2"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-12"
      >
        <div class="relative">
          <div
            class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"
          ></div>
          <div
            class="absolute top-0 left-0 h-16 w-16 border-t-4 border-b-4 border-green-600 rounded-full animate-ping opacity-20"
          ></div>
        </div>
        <p class="mt-4 text-gray-600 font-medium text-lg">
          Loading your posts...
        </p>
      </div>

      <!-- Error State -->
      <div
        v-if="error"
        class="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-md mb-6"
      >
        <div class="flex items-center">
          <svg
            class="w-6 h-6 text-red-500 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 class="text-red-800 font-semibold text-lg">Error</h3>
            <p class="text-red-700 mt-1">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Posts List -->
      <div v-if="!loading && userPosts.length" class="space-y-4">
        <article
          v-for="post in userPosts"
          :key="post.post_id"
          class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
        >
          <div class="p-6">
            <!-- Post Header -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
                >
                  {{ getInitial(userProfile.username) }}
                </div>
                <div class="ml-3">
                  <h3 class="font-semibold text-gray-900">
                    {{ userProfile.username }}
                  </h3>
                  <p class="text-sm text-gray-500">
                    {{ formatDate(post.timestamp) }}
                  </p>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center space-x-2">
                <router-link
                  :to="`/posts/${post.post_id}`"
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  title="View Post"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </router-link>
                <router-link
                  :to="`/posts/${post.post_id}/update`"
                  class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                  title="Edit Post"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </router-link>
                <button
                  @click="confirmDelete(post.post_id)"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  title="Delete Post"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Post Content -->
            <div class="prose max-w-none mb-4">
              <p
                class="text-gray-800 text-base leading-relaxed whitespace-pre-wrap"
              >
                {{ post.text }}
              </p>
            </div>

            <!-- Post Footer -->
            <div
              class="pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500"
            >
              <div class="flex items-center space-x-4">
                <span
                  class="flex items-center hover:text-red-600 transition duration-200"
                >
                  <svg
                    class="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {{ post.likes || 0 }} likes
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div
        v-if="!loading && !error && userPosts.length === 0"
        class="text-center py-16"
      >
        <div class="bg-white rounded-xl shadow-md p-12 border border-gray-100">
          <svg
            class="w-20 h-20 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <h3 class="text-2xl font-semibold text-gray-700 mb-2">
            No posts yet
          </h3>
          <p class="text-gray-500 text-lg mb-6">
            Start sharing your thoughts with the world!
          </p>
          <div class="text-blue-600 font-medium">
            Create your first post above ↑
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DisplayPosts from "../components/DisplayPosts.vue";
import { postService } from "../../services/posts.service";
import { authPostService } from "../../services/auth.post.service";

export default {
  components: {
    DisplayPosts,
  },
  data() {
    return {
      userProfile: {
        username: "",
        first_name: "",
        last_name: "",
        followers: 0,
        following: 0,
      },
      userPosts: [],
      loading: true,
      error: "",
    };
  },
  mounted() {
    // Check if user is logged in, redirect to login if not
    const userId = localStorage.getItem("user_id");
    if (!userId || userId === "undefined" || userId === "null") {
      this.$router.push("/login");
      return;
    }

    this.loadUserData();
  },
  methods: {
    loadUserData() {
      this.loading = true;
      this.error = "";

      const userId = localStorage.getItem("user_id");

      if (!userId) {
        return;
      }

      // Get user profile data
      postService
        .getusers(userId)
        .then((userData) => {
          this.userProfile = {
            username: userData.username || "",
            first_name: userData.first_name || "",
            last_name: userData.last_name || "",
            followers: Array.isArray(userData.followers)
              ? userData.followers.length
              : 0,
            following: Array.isArray(userData.following)
              ? userData.following.length
              : 0,
          };

          // Get user's posts from feed and filter by user_id
          return postService.getFeed();
        })
        .then((allPosts) => {
          // Filter posts to show only user's posts
          // Backend uses 'author' object instead of 'user_id'
          this.userPosts = allPosts.filter((post) => {
            // Check both post.user_id and post.author.user_id for compatibility
            const postUserId =
              post.user_id || (post.author && post.author.user_id);
            return String(postUserId) === String(userId);
          });

          this.loading = false;
        })
        .catch((error) => {
          console.error("Error loading profile data:", error);
          this.error =
            typeof error === "string" ? error : "Failed to load profile data";
          this.loading = false;
        });
    },
    confirmDelete(postId) {
      if (
        confirm(
          "Are you sure you want to delete this post? This action cannot be undone."
        )
      ) {
        this.deletePost(postId);
      }
    },
    deletePost(postId) {
      authPostService
        .deletePosts(postId)
        .then(() => {
          // Remove the deleted post from the list
          this.userPosts = this.userPosts.filter(
            (post) => post.post_id !== postId
          );
          // Show success message
          alert("Post deleted successfully!");
        })
        .catch((error) => {
          console.error("Delete error:", error);
          alert("Failed to delete post: " + error);
        });
    },
    getInitial(username) {
      return username ? username.charAt(0).toUpperCase() : "U";
    },
    formatDate(timestamp) {
      if (!timestamp) return "Just now";

      const date = new Date(timestamp);
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);

      if (diffInSeconds < 60) return "Just now";
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
      if (diffInSeconds < 86400)
        return `${Math.floor(diffInSeconds / 3600)}h ago`;
      if (diffInSeconds < 604800)
        return `${Math.floor(diffInSeconds / 86400)}d ago`;

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },
  },
};
</script>
