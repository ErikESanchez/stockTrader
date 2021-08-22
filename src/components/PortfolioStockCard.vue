<template>
  <div>
    <div class="card bg-dark text-white" style="margin-bottom: 5px">
      <div class="card-body text-center">
        <h5 class="card-title">{{ stock.name }}</h5>
        <p class="card-text">Amount Of Stock Owned: {{ stock.amountOwned }}</p>
        <button class="btn btn-light rounded-pill" @click="sellStock(stock)">
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
    // * Need to make this work with the stock symbol instead of the name
    sellStock(stock: stockData) {
      let sellStockTransaction: newStockTransaction = {
        symbol: stock.symbol,
        data: {
          priceAtTransaction: 215,
          amount: 1,
          time: new Date(),
        },
        // * I might import the name from elsewhere 
        name: stock.name
      };
      store.dispatch("portfolio/sellStock", sellStockTransaction);
    },
  },
});
</script>

<style></style>
