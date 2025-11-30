<template>
  <div>
    <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <svg
        class="w-5 h-5 mr-2 text-blue-600"
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
      What's on your mind?
    </h3>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="relative">
        <textarea
          v-model="text"
          rows="3"
          placeholder="Share your thoughts..."
          class="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition duration-200"
          maxlength="280"
        ></textarea>
        <div class="absolute bottom-2 right-2 text-xs text-gray-400">
          {{ text.length }}/280
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2 text-sm text-gray-500">
          <svg
            class="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your post will be visible to everyone</span>
        </div>

        <button
          type="submit"
          :disabled="!text.trim() || isSubmitting"
          class="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 shadow-md hover:shadow-lg"
        >
          <span v-if="!isSubmitting">Post</span>
          <span v-else class="flex items-center">
            <svg
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
            Posting...
          </span>
        </button>
      </div>

      <!-- Success Message -->
      <div
        v-if="showSuccess"
        class="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm"
      >
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        Post created successfully!
      </div>

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm"
      >
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script>
import { authPostService } from "../../services/auth.post.service";

export default {
  emits: ["post-created"],
  data() {
    return {
      text: "",
      isSubmitting: false,
      showSuccess: false,
      errorMessage: "",
    };
  },
  methods: {
    handleSubmit() {
      if (!this.text.trim()) return;

      this.isSubmitting = true;
      this.errorMessage = "";
      this.showSuccess = false;

      authPostService
        .postPosts(this.text)
        .then(() => {
          console.log("Post added successfully");
          this.text = "";
          this.showSuccess = true;

          // Emit event to parent to refresh feed
          this.$emit("post-created");

          // Hide success message after 3 seconds
          setTimeout(() => {
            this.showSuccess = false;
          }, 3000);
        })
        .catch((error) => {
          console.error("Create Post error:", error);
          this.errorMessage = "Failed to create post. Please try again.";
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },
  },
};
</script>
