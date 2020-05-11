<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Navbar from "./components/Navbar.vue";
import { Market } from "@/Classes/Market";
import { Stock } from "./Classes/Stock";

import store from "@/store";

export default {
  name: "App",
  components: {
    Navbar
  },
  async created() {
    await store.dispatch("fetchUser");
  }
};
</script>

 <style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>

