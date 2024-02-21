<template>
  <div>
    <nav class="navbar">
      <router-link to="/"><h1 class="welcome-text">Welcome to Chirrup!</h1></router-link>
      <!-- <h1 class="welcome-text">Welcome to Chirrup!</h1> -->
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/profile">Profile</router-link>
        
      </div>
      <div class="authentication-links">
        <router-link to="/users">SignUp</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/logout">Logout</router-link>
      </div>
    </nav>
    
    <SearchUser />
    <router-view />
  </div>
</template>
<script>
import SearchUser from './pages/SearchUser.vue';
export default {
  components: {
    SearchUser,
  },
};

</script>

<style scoped>
/* Add your global styles here */

body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

div {
  box-sizing: border-box;
}


.navbar {
  background-color: #333;
  padding: 10px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  
}

.welcome-text {
  color: green; /* Set color of the logo  to green */
  
}

.nav-links,
.authentication-links {
  display: flex;
  gap: 20px;
}

.navbar a {
  color: white;
  text-decoration: none;
}

</style>









