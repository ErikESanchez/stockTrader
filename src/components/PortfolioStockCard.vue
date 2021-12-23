<template>
  <div>
    <div class="card bg-dark text-white" style="margin-bottom: 5px">
      <div class="card-body text-center">
        <router-link :to="stockRoute" class="text-white">
          <h5 class="card-title">{{ stock.portfolio.name }}</h5>
        </router-link>
        <p class="card-text">Share: {{ stock.portfolio.amountOwned }}</p>
        <p class="card-text">
          Price of Stock:
          {{
            stock["allStockData"]["Time Series(Daily)"][
              stock["allStockData"]["Meta Data"]["3. Last Refreshed"]
            ]["2. high"]
          }}
        </p>
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
  data() {
    return {
      stockRoute: "stocks/" + this.stock.portfolio.name,
    };
  },
  methods: {
    sellStock(stock: any) {
      // *Change selling logic to conform with all the data in the stock parameter
      let latestDate: string =
        stock["allStockData"]["Meta Data"]["3. Last Refreshed"];
      console.log(latestDate);
      // let sellStockTransaction: newStockTransaction = {
      // symbol: stock.allStockData["Meta Data"]["2. Symbol"],
      // data: {
      //   priceAtTransaction: Number(
      //     stock.allStockData["Time Series(Daily)"][latestDate]["2. high"]
      //   ),
      //   amount: 1,
      //   // time: new Date(),
      // },
      // name: stock.allStockData["Company Overview"].Name,
      // };
      // store.dispatch("portfolio/sellStock", sellStockTransaction);
    },
  },
});
</script>

<style></style>
