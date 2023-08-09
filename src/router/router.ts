import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/TodoList", component: () => import("../views/TodoList.vue") },
  { path: "/SetTime", component: () => import("../views/SetTime.vue") },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/SetTime",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
