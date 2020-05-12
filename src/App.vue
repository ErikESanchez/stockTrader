<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Navbar from "./components/Navbar.vue";
import { Market } from "@/Classes/Market";
// import marketData from "@/stockData.json";
import { Stock } from "./Classes/Stock";
import { User } from "./Classes/User";
export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {};
  },
  async created() {
    console.log(this.$route.params.id);
    let user = new User();
    await user.fetchUser();
    // this.funds = this.$store.getters.totalFunds;
  }
};
</script>

 <style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>

