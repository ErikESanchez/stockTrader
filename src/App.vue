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
    this.$store.commit("setUserClass", new User());
    let user = this.$store.getters.getUserClass;
    await user.fetchUser();
  }
};
</script>

 <style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>

