import { createRouter, createWebHashHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Register from "@/views/Auth/Register.vue";
import Home from "../views/Home.vue";
import Profil from "../views/Profil.vue";
import Login from "../components/Home/Login.vue";

const routes = [
  {
    path: "/",
    name: "Auth",
    component: Auth,
  },

  {
    path: "/register",
    name: "Register",
    component: Register,
  },

  {
    path: "/Login",
    name: "Login",
    component: Login,
  },

  {
    path: "/Home",
    name: "Home",
    component: Home,
  },

  {
    path: "/Profil",
    name: "Profil",
    component: Profil,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
