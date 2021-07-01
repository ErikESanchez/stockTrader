<template>
  <div>
    <div class="card mb-2 bg-dark text-white border-white m-2">
      <div class="card-body">
        <h5 class="card-title">{{ stock.symbol }}</h5>
        <p class="card-text">Amount Of Stock Owned: {{ stock.amountOwned }}</p>
        <button class="btn btn-primary" @click="sellStock(stock)">
          Sell Stock
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { newStockTransaction, stockData } from "@/storeModules/portfolio";
import Vue from "vue";
import store from "../store";
export default Vue.extend({
  props: ["stock"],
  methods: {
    sellStock(stock: stockData) {
      let sellStockTransaction: newStockTransaction = {
        symbol: stock.symbol,
        data: {
          priceAtTransaction: 215,
          amount: 1,
          time: new Date(),
        },
      };
      store.dispatch("portfolio/sellStock", sellStockTransaction);
    },
  },
});
</script>

<style></style>
