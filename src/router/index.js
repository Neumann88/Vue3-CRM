import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "Login",
    meta: { layout: "empty" },
    component: () => import("@/components/LoginRegister/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: { layout: "empty" },
    component: () => import("@/components/LoginRegister/Register.vue"),
  },
  {
    path: "/",
    name: "Home",
    meta: { layout: "main" },
    component: () => import("@/components/Home/Home.vue"),
  },
  {
    path: "/categories",
    name: "Categories",
    meta: { layout: "main" },
    component: () => import("@/components/Categories/Categories.vue"),
  },
  {
    path: "/detail-record",
    name: "DetailRecord",
    meta: { layout: "main" },
    component: () => import("@/components/views/DetailRecord.vue"),
  },
  {
    path: "/history",
    name: "History",
    meta: { layout: "main" },
    component: () => import("@/components/views/History.vue"),
  },
  {
    path: "/planning",
    name: "Planning",
    meta: { layout: "main" },
    component: () => import("@/components/views/Planning.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { layout: "main" },
    component: () => import("@/components/views/Profile.vue"),
  },
  {
    path: "/record",
    name: "Record",
    meta: { layout: "main" },
    component: () => import("@/components/Record/Record.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
