<template>
  <div
    class="card bg-dark border-light"
    style="margin-top: 10px; width: 140px; height: 125px "
  >
    <div class="card-body">
      <router-link :to="stockRoute" class="card-title text-light">
        {{ stock["stockData"]["name"] }}
      </router-link>
      <h5 class="card-title text-success">{{ stock["stockData"]["open"] }}$</h5>

      <!-- <p class="card-text text-success"> -->
      <!-- {{ stock["stockData"]["lastRefreshed"] }} -->
      <!-- </p> -->
      <button class="btn btn-light" @click="buyStock(stock)">
        Buy Stock
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import { newStockTransaction, UserPortfolio } from "@/storeModules/portfolio";
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
    buyStock(stock: stockDataFormat): void {
      let portfolio: UserPortfolio = store.getters["portfolio/portfolio"];
      if (portfolio.availableFunds > stock.stockData.high) {
        let boughtStockTransaction: newStockTransaction = {
          symbol: stock.stockData.name,
          data: {
            priceAtTransaction: stock.stockData.high,
            amount: this.amountToBuy,
            time: new Date(),
          },
        };
        store.dispatch("portfolio/buyStock", boughtStockTransaction);
      }
    },
  },
});
</script>

<style></style>
