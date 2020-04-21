import Vue from "vue";
import Router, { RouterOptions } from "vue-router";

Vue.use(Router);

import Landing from "@/views/Landing.vue";
import Stocks from "@/views/Stocks.vue";
import Portfolio from "@/views/Portfolio.vue";
import singleStock from "@/views/singleStock.vue";
// Todo: Make 404 route

let routerOptions: RouterOptions = {
  routes: [
    {
      path: "/",
      name: "home",
      component: Landing,
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
    {
      path: "/portfolio",
      name: "portfolio",
      component: Portfolio,
    },
  ],
};

export default new Router({
  mode: "history",
  routes: routerOptions.routes,
});
