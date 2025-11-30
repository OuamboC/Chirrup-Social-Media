<template>
  <!-- Hero Section with Search -->
  <div class="bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-3">
          Welcome to Chirrup!
        </h1>
        <p class="text-lg text-gray-600">
          Connect, share, and discover amazing content
        </p>
      </div>

      <!-- Search Box -->
      <div class="max-w-2xl mx-auto">
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
          >
            <svg
              class="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            placeholder="Search for users..."
            class="block w-full pl-12 pr-32 py-4 text-gray-900 bg-white border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md hover:shadow-lg transition-all duration-300 text-lg"
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-2">
            <button
              @click="handleSearch"
              class="px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Feed Section -->
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Feed Header -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Chirrup Blog</h2>
        <div
          class="h-1 w-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full"
        ></div>
      </div>

      <!-- Display Posts Component -->
      <div class="mb-8">
        <DisplayPosts />
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
        <p class="mt-4 text-gray-600 font-medium text-lg">Loading posts...</p>
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
      <div v-if="posts.length && !loading" class="space-y-4">
        <article
          v-for="post in posts"
          :key="post.post_id"
          class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 transform hover:-translate-y-1"
        >
          <router-link :to="'/posts/' + post.post_id" class="block p-6 group">
            <div class="flex items-start space-x-4">
              <!-- Avatar -->
              <div class="flex-shrink-0">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
                >
                  {{ getInitial(post.username) }}
                </div>
              </div>

              <!-- Post Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-2">
                  <h3
                    class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    {{ post.username || "Anonymous" }}
                  </h3>
                  <svg
                    class="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200 transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>

                <p class="text-gray-700 text-base leading-relaxed mb-3">
                  {{ post.text }}
                </p>

                <!-- Post Meta -->
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span
                    class="flex items-center hover:text-blue-600 transition-colors duration-200"
                  >
                    <svg
                      class="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {{ formatDate(post.timestamp) }}
                  </span>
                  <span
                    class="flex items-center hover:text-red-600 transition-colors duration-200"
                  >
                    <svg
                      class="w-4 h-4 mr-1"
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
                    {{ post.likes || 0 }}
                  </span>
                </div>
              </div>
            </div>
          </router-link>
        </article>
      </div>

      <!-- Empty State -->
      <div v-if="!posts.length && !loading && !error" class="text-center py-16">
        <div class="bg-white rounded-xl shadow-md p-12 border border-gray-200">
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
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 class="text-2xl font-semibold text-gray-700 mb-2">
            No posts yet
          </h3>
          <p class="text-gray-500 text-lg">
            Be the first to share something amazing!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postService } from "../../services/posts.service";
import DisplayPosts from "../components/DisplayPosts.vue";

export default {
  components: {
    DisplayPosts,
  },
  data() {
    return {
      posts: [],
      error: "",
      loading: true,
      searchQuery: "",
    };
  },
  mounted() {
    postService
      .getFeed()
      .then((posts) => {
        this.posts = posts;
        this.loading = false;
      })
      .catch((error) => {
        this.error = error;
        this.loading = false;
      });
  },
  methods: {
    handleSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({ path: "/search", query: { q: this.searchQuery } });
      }
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
