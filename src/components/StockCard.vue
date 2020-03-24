<template>
  <div>
    <b-card
      border-variant="primary"
      header-bg-variant="success"
      header-text-variant="white"
      align="center"
      v-for="stock in stocks"
      :key="stock.data"
      v-model="toBuy"
    >
      {{ stock.name }}
      <b-card-text>Price: {{ stock.value }}</b-card-text>
      <b-button variant="success" @click="buyStock(stock, 1)">Buy</b-button>
      <b-row class="my-1" v-for="type in types" :key="type">
        <b-col sm="3">
          <label :for="`type-${type}`">
            Type
            <code>{{ type }}</code>:
          </label>
        </b-col>
        <b-col sm="9">
          <b-form-input :id="`type-${type}`" :type="type" v-model="bought">{{ bought }}</b-form-input>
        </b-col>
      </b-row>
      <button @click="testData">test btn</button>
    </b-card>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from "vue";
import { newStockTransaction } from "../store";
import { TIME_SERIES_DAILY } from "@/storeModules/marketData";
interface stock {
  name: string;
  value: number;
}
// Maze
// Player
export default Vue.extend({
  data() {
    return {
      stocks: [],
      bought: [], // Dev Note:  At least initialize with empty [] to get functionality
      toBuy: 1,
      types: ["number"] // Dev Note:  the heck is this ?
    };
  },

  methods: {
    stockGetter() {
      this.stocks = this.$store.getters.getAllStocks;
    },
    buyStock(stock: stock, amount: number) {
      console.log(stock);
      let formatedTr: newStockTransaction = {
        stockName: stock.name,
        stockData: {
          priceAtTransaction: stock.value,
          amount,
          time: new Date()
        },
        buy: true
      };
      this.$store.dispatch("buyStock", formatedTr);
      console.log("Current stocks", this.$store.getters.getUserStocks);
    },
    async testData() {
      let testPayload: TIME_SERIES_DAILY = {
        function: "TIME_SERIES_DAILY",
        symbol: "MSFT"
      };
      await this.$store
        .dispatch("getStockQuote", testPayload)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  async beforeMount() {
    this.stockGetter();
  }
});
</script>

<style>
</style>