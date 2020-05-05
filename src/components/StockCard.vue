<template>
  <div>
    <b-card
      border-variant="primary"
      header-bg-variant="success"
      header-text-variant="white"
      align="center"
    >
      <router-link :to="stockRoute">{{ stock[keyProp]["stockData"]["name"] }}</router-link>
      <b-card-text>Price: {{ stock[keyProp]["stockData"]["open"] }}</b-card-text>
      <b-card-text>Date Of Data: {{ stock[keyProp]["stockData"]["lastRefreshed"]}}</b-card-text>
      <b-card-text>Volume: {{ stock[keyProp]["stockData"]["volume"] }}</b-card-text>
      <b-button variant="success" @click="buyStock(stock, 1)">Buy</b-button>
      <b-row class="my-1">
        <b-col sm="3"></b-col>
        <b-col sm="9">
          <b-form-input type="number" v-model="amountToBuy"></b-form-input>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from "vue";

import { newStockTransaction } from "@/store";

interface stock {
  name: string;
  value: number;
}
export default Vue.extend({
  data() {
    return {
      amountToBuy: 1,
      apiStockData: Object,
      stockRoute: "stocks/" + this.stock[this.keyProp]["stockData"]["name"]
    };
  },
  props: {
    stock: Array,
    keyProp: Number
  },
  mounted() {
    console.log(this.stockRoute);
  },
  methods: {
    buyStock(stock: stock) {
      let formatedTr: newStockTransaction = {
        stockName: stock.name,
        stockData: {
          priceAtTransaction: stock.value,
          amount: this.amountToBuy,
          time: new Date()
        },
        buy: true
      };
      this.$store.dispatch("buyStock", formatedTr);

      console.log("Current stocks", this.$store.getters.getUserStocks);
    }
  }
});
</script>

<style>
</style>