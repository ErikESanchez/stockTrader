<template>
  <div>
    <b-card
      border-variant="primary"
      header-bg-variant="success"
      header-text-variant="white"
      align="center"
      :key="stock.name"
    >
      {{ stock.name }}
      <b-card-text>Price: {{ stock.value }}</b-card-text>
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
import { newStockTransaction } from "../Classes/TradeStocks";
import { TIME_SERIES_DAILY } from "@/storeModules/marketData";
import { eventBus } from "../main";

interface stock {
  name: string;
  value: number;
}
export default Vue.extend({
  data() {
    return {
      amountToBuy: 0
    };
  },
  props: {
    stock: Object
  },
  mounted() {
    console.log(this.stock);
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
      eventBus.$emit("fireMethod");

      console.log("Current stocks", this.$store.getters.getUserStocks);
    },
    // <button @click="testData">test btn</button>
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
  }
});
</script>

<style>
</style>