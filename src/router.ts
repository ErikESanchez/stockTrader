import Vue from "vue";
import Router, { RouterOptions } from "vue-router";

Vue.use(Router);

import Landing from "@/views/Landing.vue";
import Stocks from "@/views/Stocks.vue";
import singleStock from "@/views/singleStock.vue";
import signUp from "@/views/signUp.vue";
import login from "@/views/login.vue";

// Todo: Make 404 route

let routerOptions: RouterOptions = {
  routes: [
    {
      path: "/",
      name: "home",
      component: Landing,
    },
    {
      path: "/login",
      name: "loginPage",
      component: login,
    },
    {
      path: "/signUp",
      name: "signUp",
      component: signUp,
    },

    {
      path: "/stocks",
      name: "stocks",
      component: Stocks,
    },
    {
      path: "/stocks/:stock",
      name: "singleStock",
      component: singleStock,
    },
  ],
};

export default new Router({
  mode: "history",
  routes: routerOptions.routes,
});
