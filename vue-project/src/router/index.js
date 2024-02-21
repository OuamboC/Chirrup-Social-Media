import { createRouter, createWebHistory } from 'vue-router';

import Home from "/src/views/pages/Home.vue" 
import Login from "/src/views/pages/Login.vue"
import SignUp from "/src/views/pages/SignUp.vue"
import Profile from "/src/views/pages/Profile.vue"
import SinglePost from "/src/views/pages/SinglePost.vue"
import SingleUser from "/src/views/pages/SingleUser.vue"
import SearchUser from "/src/views/pages/SearchUser.vue"
//import PostText from "/src/views/pages/PostText.vue"
import EditPostText from "/src/views/pages/EditPostText.vue"
import { auth } from "../services/auth.service"
import Logout from "/src/views/pages/Logout.vue"

const routes = [
    { path: "/", component: Home},
    { path: "/login", component: Login},
    { path: "/users", component: SignUp },
    { path: "/profile", component: Profile, beforeEnter: auth.ifAuthenticated },
    { path: "/posts/:id", component: SinglePost }, 
    { path: "/users/:id", component: SingleUser },
    { path: "/search", component: SearchUser },
    { path: "/logout", component: Logout, beforeEnter: auth.ifAuthenticated },
    //{ path: "/posts", component: PostText, beforeEnter: auth.ifAuthenticated },
    { path: "/posts/:id/update", component: EditPostText, beforeEnter: auth.ifAuthenticated },//updateposts
    
    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


export default router;





