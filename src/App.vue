<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "./components/Navbar.vue";
import { Portfolio } from "@/Classes/Portfolio";
import { Account } from "@/Classes/Account";
import { firebaseData } from "@/firebase";
import store from "@/store";

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
  async created() {
    await firebaseData.auth().onAuthStateChanged(async (user) => {
      if (user) {
        let account: Account = new Account(user);
        store.commit("userModule/setAccount", account as Account);
        store.dispatch("portfolio/getPortfolio", user.uid);
        this.signedIn = true as boolean;
        this.dataLoaded = true;
      } else {
        let account: Account = new Account();
        store.commit("userModule/setAccount", account as Account);
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
