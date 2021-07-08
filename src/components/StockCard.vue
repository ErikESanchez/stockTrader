<template>
  <div class="card" style="background-color: #232627">
    <div class="card-body text-center">
      <router-link :to="stockRoute" class="card-title  text-white">
        {{ stock["stockData"]["name"] }}
      </router-link>


      <h5 class="card-text text-success">{{ stock["stockData"]["open"] }}$</h5>

      <!-- <p class="card-text text-success"> -->
      <!-- {{ stock["stockData"]["lastRefreshed"] }} -->
      <!-- </p> -->
      <button class="btn btn-light rounded-pill" @click="buyStock(stock)">
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
