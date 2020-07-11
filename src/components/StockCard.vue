<template>
  <div class="card mb-2">
    <div class="card-body">
      <router-link :to="stockRoute" class="card-title">
        {{ stock["stockData"]["name"] }}
      </router-link>
      <p class="card-text">
        {{ stock["stockData"]["open"] }}$
        {{ stock["stockData"]["lastRefreshed"] }}
      </p>
      <button class="btn btn-primary">Sell Stock</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import { newStockTransaction } from "@/Classes/Portfolio";

export default Vue.extend({
  props: ["stock"],
  data() {
    return {
      amountToBuy: 1,
      // Todo: For some reason this gives an error
      stockRoute: ("stocks/" + this.stock["stockData"]["name"]) as string,
    };
  },
  // methods: {
  //   buyStock(stock: stock) {
  //     let stockTransaction: newStockTransaction = {
  //       stockName: stock.stockData.name,
  //       stockData: {
  //         priceAtTransaction: stock.stockData.high,
  //         amount: this.amountToBuy,
  //         time: new Date(),
  //       },
  //     };
  //     store.dispatch("portfolio/buyStock", stockTransaction);
  //   },
  // },
});
</script>

<style></style>
