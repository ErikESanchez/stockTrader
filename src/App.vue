<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

// Todo: add a footer if you want
import Navbar from "./components/Navbar.vue";
import { Portfolio } from "@/Classes/Portfolio";
import { firebaseData } from "@/firebase";
import store from "@/store";
import moment from "moment";

export default Vue.extend({
  name: "App",
  components: {
    Navbar,
  },
  data() {
    return {
      signedIn: false,
      dataLoaded: false,
    };
  },
  methods: {},
  async created() {
    await firebaseData.auth().onAuthStateChanged(async (user) => {
      if (user) {
        store.commit("setUserClass", user);
        // Todo: If user has stock(s), put them into the parameters
        console.log(user.uid);
        let portfolio: Portfolio = new Portfolio(user.email!);
        store.commit("setPortfolio", portfolio as Portfolio);
        this.signedIn = true as boolean;
        // Todo: Get user Portfolio Data
        // If user does not have account make one, but prompt the user for one first
        this.dataLoaded = true;
      } else {
        // Todo: get rid of data from portfolio
        store.commit("changedSignedInStatus", false);
        console.log("$$$ Sign Up to get some dolla dolla bills yall $$$");
        this.dataLoaded = true as boolean;
      }
    });
  },
});
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>
