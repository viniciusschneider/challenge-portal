import Vue from "vue";
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from "vue-router";
import store from "@/store/index";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/teams",
    name: "Teams",
    component: () => import("../views/teams/Teams.vue"),
  },
  {
    path: "/teams/create",
    name: "TeamsCreate",
    component: () => import("../views/teams/TeamsCreate.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext<Vue>) => {
  const token = store.state.user.accessToken.token;

  if (to.name !== "Login" && !token) {
    next({ name: "Login" });
  } else if (to.path === "/" || (to.name === "Login" && !!token)) {
    next({ name: "Teams" });
  } else {
    next();
  }
});

export default router;
