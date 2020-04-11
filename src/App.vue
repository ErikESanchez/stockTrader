<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {};
  },
  created() {}
};
</script>

 <style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>

