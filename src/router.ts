import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import Landing from "./views/Landing.vue";
import Stocks from "./views/Stocks.vue";
import Portfolio from "./views/Portfolio.vue";
import singleStock from "./views/singleStock.vue";
import SignUpPage from "./views/SignUpPage.vue";
import LogInPage from "./views/LogInPage.vue";
import Profile from "./views/Profile.vue";

export default new Router({
  routes: [
    {
      path: "/",
      name: "landing",
      component: Landing,
    },
    {
      path: "/stocks",
      name: "stocks",
      component: Stocks,
    },
    {
      path: "/stocks/:stockName",
      name: "singleStock",
      component: singleStock,
    },
    {
      path: "/portfolio",
      name: "portfolio",
      component: Portfolio,
    },
    {
      path: "/signUp",
      name: "signUp",
      component: SignUpPage,
    },
    {
      path: "/logIn",
      name: "logIn",
      component: LogInPage,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
  ],
  mode: "history",
});
