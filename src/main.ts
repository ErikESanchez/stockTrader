import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import router from "./router";
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";
import App from "./App.vue";

// Import the styles directly. (Or you could add them via script tags.)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
Vue.use(Router);

// Dev Note: I would import these at the end of the App.vue file but thats just me
// <style lang="scss">
// @import "~bootstrap/scss/bootstrap";
// .startPoint {
//   background-color: lightblue;
// }

// .endPoint {
//   background-color: lightcoral;
// }
// </style>

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
}).$mount("#app");
