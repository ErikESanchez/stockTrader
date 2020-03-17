<template>
  <div>
    <!-- Goal is to make this dynamic so it can render as much data as store sends -->
    <b-card-group deck class="card-group">
      <stock-card></stock-card>
    </b-card-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import StockCard from "./StockCard.vue";
export default Vue.extend({
  components: {
    StockCard
  }
});
</script>>
</script>

<style scoped>
.card-group {
  margin: 30px;
}
</style>