<template>
  <div>
    <div class="card bg-dark text-white container" style="margin-bottom: 5px">
      <div class="card-body text-center">
        <router-link :to="stockRoute" class="text-white">
          <h5 class="card-title">{{ symbol }}</h5>
        </router-link>
        <p class="card-text">Share: {{ ownedStock.owned }}</p>
        <p class="card-text">
          Price:
          {{ stockData["high"] }}
        </p>
        <button class="btn btn-light rounded-pill" @click="sellStock()">
          Sell Stock
        </button>
        <input
          class="input-group-text"
          style="margin-top: 5px"
          type="number"
          :min="1"
          v-model="amountToSell"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { newStockTransaction } from "@/interfaces/global.interface";
import Vue from "vue";
import store from "../store";
export default Vue.extend({
  props: ["ownedStock", "symbol", "stockData"],
  data() {
    return {
      stockRoute: "stocks/" + this.symbol,
      amountToSell: 1,
    };
  },
  mounted() {},
  methods: {
    sellStock() {
      // *Change selling logic to conform with all the data in the stock parameter
      let sellStockTransaction: newStockTransaction = {
        symbol: this.symbol,
        priceAtTransaction: this.stockData["high"],
        amount: -this.amountToSell,
        time: new Date().toString(),
      };
      store.dispatch("portfolio/sellStock", sellStockTransaction);
    },
  },
});
</script>

<style></style>
