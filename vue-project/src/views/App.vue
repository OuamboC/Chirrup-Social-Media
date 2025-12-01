<template>
  <div id="app">
    <!-- Modern Navigation Bar with Mobile Menu -->
    <nav class="bg-gray-900 text-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <!-- Logo/Brand -->
          <router-link to="/" class="flex items-center space-x-2 hover:opacity-80 transition">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <span class="text-xl font-bold">Chirrup</span>
          </router-link>

          <!-- Desktop Navigation Links -->
          <div class="hidden md:flex items-center space-x-6">
            <router-link to="/" class="hover:text-blue-400 transition">Home</router-link>
            <router-link to="/profile" class="hover:text-blue-400 transition">Profile</router-link>
            <router-link to="/search" class="hover:text-blue-400 transition">Search</router-link>
            <router-link to="/users" class="hover:text-blue-400 transition">SignUp</router-link>
            <router-link to="/login" class="hover:text-blue-400 transition">Login</router-link>
            <router-link to="/logout" class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition">
              Logout
            </router-link>
          </div>

          <!-- Mobile Menu Button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden text-white focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Mobile Navigation Menu -->
        <div v-if="mobileMenuOpen" class="md:hidden py-4 space-y-2">
          <router-link to="/" @click="mobileMenuOpen = false" class="block py-2 px-4 hover:bg-gray-800 rounded transition">Home</router-link>
          <router-link to="/profile" @click="mobileMenuOpen = false" class="block py-2 px-4 hover:bg-gray-800 rounded transition">Profile</router-link>
          <router-link to="/search" @click="mobileMenuOpen = false" class="block py-2 px-4 hover:bg-gray-800 rounded transition">Search</router-link>
          <router-link to="/users" @click="mobileMenuOpen = false" class="block py-2 px-4 hover:bg-gray-800 rounded transition">SignUp</router-link>
          <router-link to="/login" @click="mobileMenuOpen = false" class="block py-2 px-4 hover:bg-gray-800 rounded transition">Login</router-link>
          <router-link to="/logout" @click="mobileMenuOpen = false" class="block py-2 px-4 bg-red-600 hover:bg-red-700 rounded transition">Logout</router-link>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      mobileMenuOpen: false
    }
  }
}
</script>

