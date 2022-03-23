import { createWebHistory, createRouter } from "vue-router";
import Users from "@/views/Users.vue";

const routes = [
  {
    path: "/",
    name: "users",
    component: Users,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;