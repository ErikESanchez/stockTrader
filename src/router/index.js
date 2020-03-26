import Vue from "vue";
import Router from "vue-router";
// Dev Note:
// ? Why would you use vue.use again if you are already using it in main?
Vue.use(Router);

import Landing from "../views/Landing.vue";
import Stocks from "../views/Stocks.vue"; // I would rename this to market or something

let configRoutes = [
  // * Home
  {
    path: "/",
    component: Landing
  },
  {
    path: "/stocks",
    compoent: Stocks
  }
];

// ! Error in typescript
// Type configRoutes does not exist on type Router
export default new Router({
  mode: "hash",
  linkActiveClass: "open active",
  router: configRoutes
});
