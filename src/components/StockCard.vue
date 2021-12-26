<template>
  <div>
    <div class="card bg-dark text-white container" style="margin-bottom: 5px">
      <div class="card-body text-center row-4">
        <h5 class="card-title">
          <router-link :to="stockRoute" class="text-white">
            {{ stock["name"] }}
          </router-link>
        </h5>
        <p class="card-text text-success">{{ stock["open"] }}$</p>
        <p class="card-text text-white">
          {{ stock["lastRefreshed"] }}
        </p>
        <button class="btn btn-light rounded-pill" @click="buyStock(stock)">
          Buy Stock
        </button>
        <input
          class="input-group-text"
          style="margin-top: 5px"
          type="number"
          :min="1"
          v-model="amountToBuy"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import {
  newStockTransaction,
  UserPortfolio,
} from "@/interfaces/global.interface";
import { FormattedStock } from "@/interfaces/market.interface";

export default Vue.extend({
  props: ["stock"],
  data() {
    return {
      amountToBuy: 1,
      stockRoute: "stocks/" + this.stock["symbol"],
    };
  },
  methods: {
    buyStock(stock: FormattedStock): void {
      let portfolio: UserPortfolio = store.getters["portfolio/portfolio"];
      if (portfolio.funds > stock.high) {
        let boughtStockTransaction: newStockTransaction = {
          symbol: stock.symbol,
          priceAtTransaction: stock.high,
          amount: this.amountToBuy,
          time: new Date().toString(),
        };
        store.dispatch("portfolio/buyStock", boughtStockTransaction);
      }
    },
  },
});
</script>

<style></style>
