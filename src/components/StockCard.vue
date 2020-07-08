<template>
  <div>
    <b-card
      border-variant="primary"
      header-bg-variant="success"
      header-text-variant="white"
      align="center"
    >
      <router-link :to="stockRoute">{{
        stock[keyProp]["stockData"]["name"]
      }}</router-link>
      <b-card-text
        >Price: {{ stock[keyProp]["stockData"]["open"] }}</b-card-text
      >
      <b-card-text
        >Date Of Data:
        {{ stock[keyProp]["stockData"]["lastRefreshed"] }}</b-card-text
      >
      <b-card-text
        >Volume: {{ stock[keyProp]["stockData"]["volume"] }}</b-card-text
      >
      <b-button variant="success" @click="buyStock(stock[keyProp], 1)"
        >Buy</b-button
      >
      <b-row class="my-1">
        <b-col sm="3"></b-col>
        <b-col sm="9">
          <!-- Todo: Don't let the amount go below 0, or more than the volume of stocks -->
          <b-form-input type="number" v-model="amountToBuy"></b-form-input>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import { newStockTransaction } from "@/Classes/Portfolio";
interface stock {
  [key: string]: any;
  name: string;
  value: number;
}
export default Vue.extend({
  data() {
    return {
      amountToBuy: 1,
      apiStockData: Object,
      stockRoute: ("stocks/" +
        this.stock[this.keyProp]["stockData"]["name"]) as string,
    };
  },
  props: ["stock", "keyProp"],
  methods: {
    buyStock(stock: stock) {
      let stockTransaction: newStockTransaction = {
        stockName: stock.stockData.name,
        stockData: {
          priceAtTransaction: stock.stockData.high,
          amount: this.amountToBuy,
          time: new Date(),
        },
      };
      store.dispatch("portfolio/buyStock", stockTransaction);
    },
  },
});
</script>

<style></style>
