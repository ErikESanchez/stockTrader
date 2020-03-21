<template>
  <div>
    <b-card
      border-variant="primary"
      header="`{stock}`"
      header-bg-variant="success"
      header-text-variant="white"
      align="center"
      v-for="stock in stocks"
      :key="stock.data"
      v-model="toBuy"
    >
      {{ stock.name }}
      <b-card-text>Price: {{ stock.value }}</b-card-text>
      <b-button variant="success" @click="boughtStock(stock, bought)">Buy</b-button>
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
    </b-card>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from "vue";
import store, { storeSchema } from "@/store.ts";
export default Vue.extend({
  data() {
    return {
      stocks: [],
      bought: null, // Dev Note:  At least initialize with empty [] to get functionality
      toBuy: 1,
      types: ["number"] // Dev Note:  the heck is this ?
    };
  },

  methods: {
    stockGetter() {
      this.stocks = this.$store.getters.getAllStocks;
    },
    // Future problem: How to organize stock if bought the same
    boughtStock(stock, amount: number) {
      let userStocks = this.$store.getters.getUserStocks;
      let allStocks = this.$store.getters.getAllStocks;
      // Todo: add interface or class
      let boughtStock = {
        stockName: stock.name,
        stockValue: stock.value,
        stockQuantity: amount
      };
      console.log(userStocks);
      if (userStocks.length == 0) {
        this.$store.commit(storeSchema.mutations.buyNewStock, boughtStock);
        console.log("You now own your first stock, congratulations!");
      } else if (userStocks.length >= 1) {
        userStocks.forEach((stock, index) => {
          console.log();
          if (userStocks[index].stockName == boughtStock.stockName) {
            console.log("Buy more same stock");
            this.$store.commit(storeSchema.mutations.buyMoreStock, boughtStock);
          } else {
            console.log("new stock");
            this.$store.commit(storeSchema.mutations.buyNewStock, boughtStock);
          }
        });
      }
      // console.log("user", userStocks, allStocks, amount);
    }
  },
  async beforeMount() {
    await this.stockGetter();
  }
});
</script>

<style>
</style>