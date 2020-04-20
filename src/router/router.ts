import Vue from "vue";
import Router, { RouterOptions } from "vue-router";

Vue.use(Router);

import Landing from "../views/Landing.vue";
import Stocks from "../views/Stocks.vue";

let routerOptions: RouterOptions = {
  routes: [
    {
      path: "/",
      component: Landing,
    },
    {
      path: "/stocks",
      component: Stocks,
    },
  ],
};

export default new Router({
  mode: "history",
  routes: routerOptions.routes,
});
