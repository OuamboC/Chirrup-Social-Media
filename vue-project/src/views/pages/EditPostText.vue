<template>
  <!-- Main Content -->
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-2xl w-full">
      <!-- Back Button -->
      <div class="mb-6">
        <button
          @click="goBack"
          class="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
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

      <!-- Edit Post Card -->
      <div
        class="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
      >
        <!-- Card Header -->
        <div class="bg-gradient-to-r from-blue-600 to-green-600 px-8 py-6">
          <div class="flex items-center justify-center mb-2">
            <div class="bg-white p-3 rounded-full">
              <svg
                class="w-8 h-8 text-blue-600"
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
            </div>
          </div>
          <h2 class="text-3xl font-bold text-white text-center">
            Edit Your Post
          </h2>
          <p class="text-blue-100 text-center mt-2">
            Update your thoughts and ideas
          </p>
        </div>

        <!-- Card Body -->
        <div class="px-8 py-8">
          <!-- Loading State -->
          <div
            v-if="loading"
            class="flex flex-col items-center justify-center py-8"
          >
            <div class="relative">
              <div
                class="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"
              ></div>
              <div
                class="absolute top-0 left-0 h-12 w-12 border-t-4 border-b-4 border-green-600 rounded-full animate-ping opacity-20"
              ></div>
            </div>
            <p class="mt-4 text-gray-600 font-medium">Loading post...</p>
          </div>

          <!-- Error State -->
          <div
            v-if="error"
            class="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4"
          >
            <div class="flex items-center">
              <svg
                class="w-5 h-5 text-red-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
              <p class="text-sm text-red-700 font-medium">{{ error }}</p>
            </div>
          </div>

          <!-- Edit Form -->
          <form
            v-if="!loading"
            @submit.prevent="handleSubmit"
            class="space-y-6"
          >
            <!-- Original Post Preview -->
            <div
              v-if="originalText"
              class="bg-gray-50 border border-gray-200 rounded-lg p-4"
            >
              <p class="text-xs font-semibold text-gray-500 uppercase mb-2">
                Original Post
              </p>
              <p class="text-gray-700 text-sm">{{ originalText }}</p>
            </div>

            <!-- Textarea Field -->
            <div>
              <label
                for="text"
                class="block text-sm font-semibold text-gray-700 mb-2"
              >
                Post Content
              </label>
              <div class="relative">
                <textarea
                  id="text"
                  v-model="text"
                  rows="6"
                  required
                  placeholder="What's on your mind?"
                  class="block w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                  :class="{
                    'border-red-500 ring-2 ring-red-500': submitted && !text,
                  }"
                  maxlength="500"
                ></textarea>
                <div class="absolute bottom-2 right-2 text-xs text-gray-400">
                  {{ text.length }}/500
                </div>
              </div>
              <p
                v-show="submitted && !text"
                class="mt-2 text-sm text-red-600 flex items-center"
              >
                <svg
                  class="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Post content is required
              </p>
            </div>

            <!-- Info Message -->
            <div class="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
              <div class="flex items-start">
                <svg
                  class="w-5 h-5 text-blue-500 mr-2 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p class="text-sm text-blue-700">
                  Your updated post will be visible to all your followers
                </p>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-3 pt-2">
              <!-- Save Button -->
              <button
                type="submit"
                :disabled="isSubmitting || !text.trim()"
                class="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span
                  v-if="!isSubmitting"
                  class="flex items-center justify-center"
                >
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Save Changes
                </span>
                <span v-else class="flex items-center justify-center">
                  <svg
                    class="animate-spin h-5 w-5 mr-2 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </span>
              </button>

              <!-- Cancel Button -->
              <button
                type="button"
                @click="goBack"
                :disabled="isSubmitting"
                class="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <span class="flex items-center justify-center">
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Cancel
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Help Text -->
      <p class="mt-6 text-center text-sm text-gray-600">
        Make sure your post follows our
        <a href="#" class="text-blue-600 hover:text-blue-700 font-medium"
          >Community Guidelines</a
        >
      </p>
    </div>
  </div>
</template>

<script>
import { authPostService } from "../../services/auth.post.service";
import { postService } from "../../services/posts.service";

export default {
  data() {
    return {
      text: "",
      originalText: "",
      post_id: this.$route.params.id,
      submitted: false,
      isSubmitting: false,
      loading: true,
      error: "",
    };
  },
  mounted() {
    this.loadPost();
  },
  methods: {
    loadPost() {
      this.loading = true;
      this.error = "";

      postService
        .getposts(this.post_id)
        .then((post) => {
          this.text = post.text;
          this.originalText = post.text;
          this.loading = false;
        })
        .catch((error) => {
          this.error =
            error ||
            "Failed to load post. You may not have permission to edit this post.";
          this.loading = false;
        });
    },
    handleSubmit() {
      this.submitted = true;

      if (!this.text.trim()) {
        return;
      }

      this.isSubmitting = true;
      this.error = "";

      authPostService
        .updatePosts(this.post_id, this.text)
        .then(() => {
          console.log("Post updated successfully");
          // Redirect to the post details page after updating
          this.$router.push("/posts/" + this.post_id);
        })
        .catch((error) => {
          console.error("Error:", error);
          this.error =
            error ||
            "Failed to update the post. You can only edit your own posts.";
          this.isSubmitting = false;
        });
    },
    goBack() {
      this.$router.push("/posts/" + this.post_id);
    },
  },
};
</script>
