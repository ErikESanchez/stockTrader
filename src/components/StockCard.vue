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
      <button class="btn btn-primary" @click="buyStock(stock)">
        Buy Stock
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import { newStockTransaction } from "@/Classes/Portfolio";
import { stockDataFormat } from "@/storeModules/marketData";

export default Vue.extend({
  props: ["stock"],
  data() {
    return {
      amountToBuy: 1,
      stockRoute: ("stocks/" + this.stock["stockData"]["name"]) as string,
    };
  },
  methods: {
    buyStock(stock: stockDataFormat) {
      let stockTransaction: newStockTransaction = {
        stockName: stock.stockData.name,
        stockData: {
          priceAtTransaction: stock.stockData.high,
          amount: this.amountToBuy,
          time: new Date(),
        },
      };
      console.log(stockTransaction);
      store.dispatch("portfolio/buyStock", stockTransaction);
    },
  },
});
</script>

<style></style>
