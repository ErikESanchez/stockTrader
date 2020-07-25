<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "./components/Navbar.vue";
import { firebaseData } from "@/firebase";
import store from "@/store";

export default Vue.extend({
  name: "App",
  components: {
    Navbar,
  },
  async created() {
    await firebaseData.auth().onAuthStateChanged(async (user) => {
      if (user) {
        store.commit("userModule/setUser", user);
        store.dispatch("portfolio/setPortfolio");
      } else {
        store.commit("userModule/setUser", Object);
        console.log("$$$ Sign Up to get some dolla dolla bills yall $$$");
      }
    });
  },
});
</script>

<style lang="scss">
@import "~bootstrap/dist/css/bootstrap.css";
@import "~bootstrap/scss/bootstrap";
</style>
