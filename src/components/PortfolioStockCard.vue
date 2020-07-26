<template>
  <div>
    <div class="card mb-2 bg-dark text-white border-white m-2">
      <div class="card-body">
        <h5 class="card-title">{{ stock.symbol }}</h5>
        <p class="card-text">Amount Of Stock Owned: {{ stock.amountOwned }}</p>
        <button class="btn btn-primary" @click="sellStock(stock.symbol)">
          Sell Stock
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from "vue";
import store from "../store";
interface stock {
  name: string;
  value: number;
}
export default Vue.extend({
  props: ["stock"],
  methods: {
    sellStock(symbol: string) {
      console.log(symbol);
      store.dispatch("portfolio/sellStock", symbol);
    },
  },
});
</script>

<style></style>
