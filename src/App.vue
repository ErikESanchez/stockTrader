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
import { firebaseData } from "@/firebase";
import store from "@/store";
import { mapGetters } from "vuex";
import { ScreenDimensions } from "./storeModules/userModule";
// Todo: Create type definiton!
// @ts-ignore
import { debounce } from "debounce";
export default Vue.extend({
  name: "App",
  components: {
    Navbar,
  },
  async mounted() {
    if (this.formatedStocks[0] === undefined) {
      await store.dispatch("marketData/getDatabaseDailyData");
    }
    firebaseData.auth().onAuthStateChanged(async (user) => {
      if (user) {
        store.commit("userModule/setUser", user);
        await store.dispatch("portfolio/getAllDBPortfolios", user.uid);
        let userPortfolios = store.getters["portfolio/userPortfolios"];
        store.dispatch("userPublicData/downloadUserPictures", userPortfolios);
      } else {
        store.commit("userModule/setUser", Object);
        console.log("$$$ Sign Up to get some dolla dolla bills yall $$$");
      }
    });
  },
  computed: mapGetters({ formatedStocks: "marketData/formatedStocks" }),
});
</script>

<style lang="scss">
@import "~bootstrap/dist/css/bootstrap.css";
@import "~bootstrap/scss/bootstrap";
#app {
  font: 17px Poppins Helvetica, sans-serif !important;
  background: #181a1b !important;
  color: white
}
html {
  font: 17px Poppins Helvetica, sans-serif !important;
  background: #181a1b !important;
}
</style>
