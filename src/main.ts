import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import router from "@/router/router";
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";
import App from "./App.vue";

// Import the styles directly.
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
Vue.use(Router);

Vue.config.productionTip = true;

export const eventBus = new Vue(); // added line

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
