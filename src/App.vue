<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
    />
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "./components/Navbar.vue";
import store from "@/store";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "@firebase/auth";

export default Vue.extend({
  name: "App",
  components: {
    Navbar,
  },
  async mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        store.commit("userModule/setUser", user);
        await store.dispatch("marketData/getDatabaseDailyData");
        await store.dispatch("portfolio/getAllPortfolios", user.uid);
      } else {
        // user is signed out
      }
    });
  },
});
</script>

<style lang="scss">
@import "~bootstrap/dist/css/bootstrap.css";
@import "~bootstrap/scss/bootstrap";
#app {
  font: 17px Poppins Helvetica, sans-serif !important;
  background: #181a1b !important;
  color: white;
}
html {
  font: 17px Poppins Helvetica, sans-serif !important;
  background: #181a1b !important;
}
</style>
