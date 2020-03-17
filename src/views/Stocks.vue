<template>
  <div>
    <stock-cards></stock-cards>
    <!-- Create Stocks (4) -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import StockCards from "../components/StockCard.vue";
export default Vue.extend({
  name: "stocks",
  components: {
    StockCards
  }
});
</script>

<style scoped>
</style>