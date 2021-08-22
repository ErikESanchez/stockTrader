<template>
  <div>
    <div class="card bg-dark text-white" style="margin-bottom: 5px">
      <div class="card-body text-center">
        <h5 class="card-title">
          <router-link :to="stockRoute" class="text-white">
            {{ stock["stockData"]["name"] }}
          </router-link>
        </h5>
        <p class="card-text text-success">{{ stock["stockData"]["open"] }}$</p>
        <p class="card-text text-white">{{stock['stockData']['lastRefreshed']}}</p>
        <button class="btn btn-light rounded-pill" @click="buyStock(stock)">
          Buy Stock
        </button>
      </div>
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
          symbol: stock.stockData.symbol,
          data: {
            priceAtTransaction: stock.stockData.high,
            amount: this.amountToBuy,
            time: new Date(),
          },
          name:  stock.stockData.name
        };
        store.dispatch("portfolio/buyStock", boughtStockTransaction);
      }
    },
  },
});
</script>

<style></style>
