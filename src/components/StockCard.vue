<template>
  <div>
    <b-card
      border-variant="primary"
      header-bg-variant="success"
      header-text-variant="white"
      align="center"
    >
      {{ stock["stockData"]["name"] }}
      <b-card-text>Price: {{ stock["stockData"]["endOfDayPrice"] }}</b-card-text>
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
import { eventBus } from "../main";

interface stock {
  name: string;
  value: number;
}
export default Vue.extend({
  data() {
    return {
      amountToBuy: 1,
      apiStockData: Object
    };
  },
  props: {
    stock: String,
    keyProp: String
  },
  mounted() {
    // console.log(this.stock);
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
    }
    // <button @click="testData">test btn</button>
  }
});
</script>

<style>
</style>