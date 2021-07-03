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
import { mapGetters } from "vuex";
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
  },
  destroyed() {
    window.removeEventListener("resize", this.checkOnWindowSize)
  },
  methods: {
    checkOnWindowSize() {
      console.log(window.innerWidth);
    },
  },
  computed: mapGetters({ formatedStocks: "marketData/formatedStocks" }),

  created() {
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
    this.checkOnWindowSize()
    window.onresize = debounce(this.checkOnWindowSize, 30)
  },
});
</script>

<style lang="scss">
@import "~bootstrap/dist/css/bootstrap.css";
@import "~bootstrap/scss/bootstrap";
#app {
  font: 17px Poppins Helvetica, sans-serif !important;
  background: #181a1b !important;
}
html {
  font: 17px Poppins Helvetica, sans-serif !important;
  background: #181a1b !important;
}
</style>
