<template>
  <!-- Main Content -->
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full">
      <!-- Signup Card -->
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
          </div>
          <h2 class="text-3xl font-bold text-white text-center">
            Join Chirrup Today!
          </h2>
          <p class="text-blue-100 text-center mt-2">
            Create your account and start connecting
          </p>
        </div>

        <!-- Card Body -->
        <div class="px-8 py-8">
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <!-- First Name Field -->
            <div>
              <label
                for="first_name"
                class="block text-sm font-semibold text-gray-700 mb-2"
              >
                First Name
              </label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  v-model="first_name"
                  required
                  placeholder="Enter your first name"
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                  :class="{
                    'border-red-500 ring-2 ring-red-500':
                      submitted && !first_name,
                  }"
                />
              </div>
              <p
                v-show="submitted && !first_name"
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
                First name is required
              </p>
            </div>

            <!-- Last Name Field -->
            <div>
              <label
                for="last_name"
                class="block text-sm font-semibold text-gray-700 mb-2"
              >
                Last Name
              </label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  v-model="last_name"
                  required
                  placeholder="Enter your last name"
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                  :class="{
                    'border-red-500 ring-2 ring-red-500':
                      submitted && !last_name,
                  }"
                />
              </div>
              <p
                v-show="submitted && !last_name"
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
                Last name is required
              </p>
            </div>

            <!-- Username Field -->
            <div>
              <label
                for="username"
                class="block text-sm font-semibold text-gray-700 mb-2"
              >
                Username
              </label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
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
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  v-model="username"
                  required
                  placeholder="Choose a unique username"
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                  :class="{
                    'border-red-500 ring-2 ring-red-500':
                      submitted && !username,
                  }"
                />
              </div>
              <p
                v-show="submitted && !username"
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
                Username is required
              </p>
            </div>

            <!-- Password Field -->
            <div>
              <label
                for="password"
                class="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  v-model="password"
                  required
                  placeholder="Create a strong password"
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                  :class="{
                    'border-red-500 ring-2 ring-red-500':
                      submitted && !password,
                  }"
                />
              </div>
              <p
                v-show="submitted && !password"
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
                Password is required
              </p>
            </div>

            <!-- Success Message -->
            <div
              v-if="successMessage"
              class="bg-green-50 border-l-4 border-green-500 rounded-lg p-4 animate-fade-in"
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

            <!-- Error Message -->
            <div
              v-if="error"
              class="bg-red-50 border-l-4 border-red-500 rounded-lg p-4"
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

            <!-- Submit Button -->
            <div class="pt-2">
              <button
                type="submit"
                :disabled="isLoading"
                class="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span
                  v-if="!isLoading"
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
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Create Account
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
                  Creating Account...
                </span>
              </button>
            </div>
          </form>

          <!-- Login Link -->
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500"
                  >Already have an account?</span
                >
              </div>
            </div>
            <div class="mt-6">
              <router-link
                to="/login"
                class="w-full flex justify-center items-center py-3 px-4 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
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
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Sign In Instead
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Text -->
      <p class="mt-8 text-center text-sm text-gray-600">
        By creating an account, you agree to our
        <a href="#" class="text-blue-600 hover:text-blue-700 font-medium"
          >Terms of Service</a
        >
        and
        <a href="#" class="text-blue-600 hover:text-blue-700 font-medium"
          >Privacy Policy</a
        >
      </p>
    </div>
  </div>
</template>

<script>
import { userService } from "../../services/user.service";

export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      submitted: false,
      isLoading: false,
      error: "",
      successMessage: "",
    };
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      this.error = "";
      this.successMessage = "";
      const { first_name, last_name, username, password } = this;

      if (!(first_name && last_name && username && password)) {
        return;
      }

      this.isLoading = true;

      userService
        .postusers(first_name, last_name, username, password)
        .then((response) => {
          console.log("Signup successful", response);

          // Show success message
          this.successMessage =
            "Account created successfully! Redirecting to login...";
          this.isLoading = false;

          // Redirect to login page after 2 seconds
          setTimeout(() => {
            this.$router.push("/login");
          }, 2000);
        })
        .catch((error) => {
          console.error("Signup failed", error);

          // Extract error message from response
          let errorMessage = "Something went wrong. Please try again.";

          if (error.response && error.response.data) {
            // If API returns a message
            if (typeof error.response.data === "string") {
              errorMessage = error.response.data;
            } else if (error.response.data.message) {
              errorMessage = error.response.data.message;
            } else if (error.response.data.error) {
              errorMessage = error.response.data.error;
            }
          } else if (error.message) {
            errorMessage = error.message;
          }

          this.error = errorMessage;
          this.submitted = false;
          this.isLoading = false;
        });
    },
  },
};
</script>
