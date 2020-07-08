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
import { Account } from "@/Classes/Account";
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
        // Todo: If user has stock(s), put them into the parameters
        let portfolio: Portfolio = new Portfolio(user.uid);
        let account: Account = new Account(user);
        store.commit("userModule/setAccount", account as Account);
        store.commit("portfolio/setPortfolioClass", portfolio as Portfolio);
        this.signedIn = true as boolean;
        this.dataLoaded = true;
      } else {
        let account: Account = new Account();
        store.commit("userModule/setAccount", account as Account);
        // store.commit("changedSignedInStatus", false);
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
