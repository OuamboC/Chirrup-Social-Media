<template>
  <!-- Main Content -->
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full">
      <!-- Login Card -->
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
          <h2 class="text-3xl font-bold text-white text-center">
            Welcome Back!
          </h2>
          <p class="text-blue-100 text-center mt-2">
            Sign in to continue to Chirrup
          </p>
        </div>

        <!-- Card Body -->
        <div class="px-8 py-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  v-model="username"
                  required
                  placeholder="Enter your username"
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
                  placeholder="Enter your password"
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
            <div>
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
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign In
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
                  Signing In...
                </span>
              </button>
            </div>
          </form>

          <!-- Sign Up Link -->
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500"
                  >Don't have an account?</span
                >
              </div>
            </div>
            <div class="mt-6">
              <router-link
                to="/users"
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                Create New Account
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Text -->
      <p class="mt-8 text-center text-sm text-gray-600">
        By signing in, you agree to our
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
      username: "",
      password: "",
      error: "",
      submitted: false,
      isLoading: false,
    };
  },
  methods: {
    handleSubmit() {
      this.error = "";
      this.submitted = true;
      const { username, password } = this;

      if (!(username && password)) {
        return;
      }

      this.isLoading = true;

      // Call the login method from your user service
      userService
        .login(username, password)
        .then(() => {
          console.log("Auth successful");
          // Redirect to the Home page after successful login
          this.$router.push("/");
        })
        .catch((error) => {
          this.error = error;
          this.submitted = false;
          this.isLoading = false;
        });
    },
  },
};
</script>
