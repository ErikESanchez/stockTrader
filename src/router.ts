import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import Landing from "@/views/Landing.vue";
import Stocks from "@/views/Stocks.vue";

export default new Router({
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
  mode: "hash",
  linkActiveClass: "open active",
});
