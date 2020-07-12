<template>
  <div>
    <div class="card mb-2">
      <div class="card-body">
        <h5 class="card-title">{{ stock }}</h5>
        <p class="card-text">Amount Of Stock Owned: {{ stock.stocksOwned }}</p>
        <button class="btn btn-primary">Sell Stock</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from "vue";
interface stock {
  name: string;
  value: number;
}
export default Vue.extend({
  props: ["stock"],
});
</script>

<style></style>
