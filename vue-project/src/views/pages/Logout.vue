<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <!-- Logout Confirmation Card -->
        <div class="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-80px)]">
            <div class="w-full max-w-md">
                <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <!-- Gradient Header -->
                    <div class="bg-gradient-to-r from-blue-600 to-green-600 p-8 text-center">
                        <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h1 class="text-3xl font-bold text-white">You've Been Logged Out</h1>
                    </div>

                    <!-- Card Content -->
                    <div class="p-8">
                        <p class="text-gray-600 text-center mb-8 text-lg">
                            Thank you for using Chirrup! We hope to see you again soon.
                        </p>

                        <!-- Sign In Again Button -->
                        <router-link
                            to="/login"
                            class="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center mb-4"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Sign In Again
                        </router-link>

                        <!-- Go to Home Button -->
                        <router-link
                            to="/"
                            class="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Go to Home
                        </router-link>
                    </div>
                </div>

                <!-- Additional Message -->
                <div class="text-center mt-6 text-gray-600">
                    <p>Have a great day! 🌟</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { userService } from "../../services/user.service";

export default {
    mounted() {
        // Automatically logout when component is mounted
        userService
            .logout()
            .then(() => {
                console.log("Logout successful");
            })
            .catch((error) => {
                console.error("Logout error:", error);
            });
    },
};
</script>
