import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/ProjectList.vue"),
  },
  {
    path: "/project/:id",
    name: "Project Details",
    component: () => import("@/views/ProjectDetails.vue"),
  },
  {
    path: "/project/:id/edit",
    name: "Edit Project",
    component: () => import("@/views/ProjectSettings.vue"),
  },
  {
    path: "/user/:id?",
    alias: "/profile",
    name: "User Profile",
    component: () => import("@/views/UserProfile.vue"),
  },
  {
    path: "/profile/edit",
    name: "Settings",
    component: () => import("@/views/UserSettings.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
