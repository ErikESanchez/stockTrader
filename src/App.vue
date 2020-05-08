<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Navbar from "./components/Navbar.vue";
import { Market } from "@/Classes/Market";
import marketData from "@/stockData.json";
import { Stock } from "./Classes/Stock";
export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {};
  },
  created() {
    console.log(this.$route.params.id);
    this.$store.dispatch("fetchUser");
    this.funds = this.$store.getters.totalFunds;
  }
};
</script>

 <style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>

