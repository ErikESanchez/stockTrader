import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import router from "@/router";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import moment from "moment";
import async from "async";
import "bootstrap";
Vue.prototype.moment = moment;
Vue.prototype.async = async;
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
Vue.use(Router);

Vue.config.productionTip = true;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
