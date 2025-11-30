<template>
  <!-- Main Content -->
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50"
  >
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
      <div class="relative">
        <div
          class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"
        ></div>
        <div
          class="absolute top-0 left-0 h-16 w-16 border-t-4 border-b-4 border-green-600 rounded-full animate-ping opacity-20"
        ></div>
      </div>
      <p class="mt-4 text-gray-600 font-medium text-lg">
        Loading user profile...
      </p>
    </div>

    <!-- Error State -->
    <div
      v-if="error && !loading"
      class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div class="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-md">
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
    </div>

    <!-- User Profile Content -->
    <div v-if="!loading && user.username">
      <!-- Profile Header Section -->
      <div class="bg-gradient-to-r from-blue-600 to-green-600 shadow-lg">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <!-- Back Button -->
          <div class="mb-6">
            <button
              @click="$router.back()"
              class="flex items-center space-x-2 px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-all duration-200"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span class="font-medium">Back</span>
            </button>
          </div>

          <div
            class="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8"
          >
            <!-- Avatar -->
            <div class="flex-shrink-0">
              <div
                class="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white"
              >
                <span class="text-5xl font-bold text-blue-600">
                  {{ getInitial(user.username) }}
                </span>
              </div>
            </div>

            <!-- User Info -->
            <div class="flex-1 text-center md:text-left">
              <h1 class="text-4xl font-bold text-white mb-2">
                {{ user.first_name }} {{ user.last_name }}
              </h1>
              <p class="text-xl text-blue-100 mb-4">@{{ user.username }}</p>

              <!-- User Stats -->
              <div
                class="flex justify-center md:justify-start space-x-8 mt-6 mb-6"
              >
                <div class="text-center">
                  <div class="text-3xl font-bold text-white">
                    {{ user.posts?.length || 0 }}
                  </div>
                  <div class="text-sm text-blue-100">Posts</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-white">
                    {{ user.followers?.length || 0 }}
                  </div>
                  <div class="text-sm text-blue-100">Followers</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-white">
                    {{ user.following?.length || 0 }}
                  </div>
                  <div class="text-sm text-blue-100">Following</div>
                </div>
              </div>

              <!-- Follow/Unfollow Button (Only if not viewing own profile) -->
              <div v-if="!isOwnProfile">
                <button
                  v-if="!isFollowing"
                  @click="followUser"
                  :disabled="actionLoading"
                  class="px-8 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span v-if="!actionLoading" class="flex items-center">
                    <svg
                      class="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Follow
                  </span>
                  <span v-else>Following...</span>
                </button>

                <button
                  v-else
                  @click="unfollowUser"
                  :disabled="actionLoading"
                  class="px-8 py-3 bg-white/20 text-white font-bold rounded-full hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span v-if="!actionLoading" class="flex items-center">
                    <svg
                      class="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M18 12H6"
                      />
                    </svg>
                    Unfollow
                  </span>
                  <span v-else>Unfollowing...</span>
                </button>
              </div>

              <!-- Own Profile Message -->
              <div v-else>
                <router-link
                  to="/profile"
                  class="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  View Your Profile
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Posts Section -->
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Posts Header -->
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">
            <span
              class="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
            >
              {{ user.first_name }}'s Posts
            </span>
          </h2>
          <p class="text-gray-600">
            {{ user.posts?.length || 0 }}
            {{ user.posts?.length === 1 ? "post" : "posts" }}
          </p>
        </div>

        <!-- Success Message -->
        <div
          v-if="successMessage"
          class="mb-4 bg-green-50 border-l-4 border-green-500 rounded-lg p-4 shadow-md animate-fade-in"
        >
          <div class="flex items-center">
            <svg
              class="w-5 h-5 text-green-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <p class="text-sm text-green-700 font-medium">
              {{ successMessage }}
            </p>
          </div>
        </div>

        <!-- Posts List -->
        <div v-if="user.posts && user.posts.length" class="space-y-4">
          <article
            v-for="post in user.posts"
            :key="post.post_id"
            class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 group"
          >
            <router-link :to="`/posts/${post.post_id}`" class="block p-6">
              <div class="flex items-start space-x-4">
                <!-- Avatar -->
                <div class="flex-shrink-0">
                  <div
                    class="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
                  >
                    {{ getInitial(user.username) }}
                  </div>
                </div>

                <!-- Post Content -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between mb-2">
                    <h3
                      class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200"
                    >
                      {{ user.username }}
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
                  <div
                    class="flex items-center space-x-4 text-sm text-gray-500"
                  >
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
                      {{ post.likes?.length || 0 }}
                    </span>
                  </div>
                </div>
              </div>
            </router-link>
          </article>
        </div>

        <!-- Empty State -->
        <div
          v-if="!user.posts || user.posts.length === 0"
          class="text-center py-16"
        >
          <div
            class="bg-white rounded-xl shadow-md p-12 border border-gray-100"
          >
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
              {{ user.first_name }} hasn't shared anything yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postService } from "../../services/posts.service";
import { authSocialService } from "../../services/auth.social.service";

export default {
  data() {
    return {
      user: {},
      loading: true,
      error: "",
      actionLoading: false,
      successMessage: "",
      currentUserId: localStorage.getItem("user_id"),
    };
  },
  computed: {
    isOwnProfile() {
      return this.user.user_id == this.currentUserId;
    },
    isFollowing() {
      if (!this.user.followers || !Array.isArray(this.user.followers)) {
        return false;
      }
      return this.user.followers.some(
        (follower) => follower.user_id == this.currentUserId
      );
    },
  },
  methods: {
    loadUserData() {
      this.loading = true;
      this.error = "";

      postService
        .getusers(this.$route.params.id)
        .then((user) => {
          this.user = user;
          this.loading = false;
        })
        .catch((error) => {
          this.error = error || "Failed to load user profile";
          this.loading = false;
        });
    },
    followUser() {
      this.actionLoading = true;
      this.successMessage = "";

      authSocialService
        .postFollowUser(this.$route.params.id)
        .then(() => {
          console.log("Followed user successfully");
          this.successMessage = `You are now following ${this.user.first_name}!`;
          this.loadUserData();

          setTimeout(() => {
            this.successMessage = "";
          }, 3000);
        })
        .catch((error) => {
          this.error = error || "Failed to follow user";
        })
        .finally(() => {
          this.actionLoading = false;
        });
    },
    unfollowUser() {
      this.actionLoading = true;
      this.successMessage = "";

      authSocialService
        .deleteFollowUser(this.$route.params.id)
        .then(() => {
          console.log("Unfollowed user successfully");
          this.successMessage = `You unfollowed ${this.user.first_name}.`;
          this.loadUserData();

          setTimeout(() => {
            this.successMessage = "";
          }, 3000);
        })
        .catch((error) => {
          this.error = error || "Failed to unfollow user";
        })
        .finally(() => {
          this.actionLoading = false;
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
  created() {
    this.loadUserData();
  },
  watch: {
    "$route.params.id"() {
      this.loadUserData();
    },
  },
};
</script>
