<template>
  <div>
    <jumbotron></jumbotron>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Jumbotron from "@/components/Jumbotron.vue";
export default Vue.extend({
  name: "landing",
  components: {
    Jumbotron
  },
  methods: {}
});
</script>