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
      <b-button variant="success" @click="boughtStock(stock)">Buy</b-button>
      <b-row class="my-1" v-for="type in types" :key="type">
        <b-col sm="3">
          <label :for="`type-${type}`">
            Type
            <code>{{ type }}</code>:
          </label>
        </b-col>
        <b-col sm="9">
          <b-form-input :id="`type-${type}`" :type="type">{{ bought }}</b-form-input>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from "vue";
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
      this.stocks = this.$store.getters.getStocks;
    },

    // Future problem: How to organize stock if bought the same
    boughtStock(stock) {
      console.log(`User bought ${stock}`);
      // Todo: add interface or class
      let bought = Number(this.toBuy.data);
      let boughtStock = {
        stockName: stock.name,
        stockValue: stock.value,
        stockQuantity: bought
      };
      let userStocks = this.$store.getters.getUserStocks;
      for (let i = 0; i < userStocks.length; i++) {
        console.log(userStocks.name);
      }
      userStocks.forEach((element, index) => {
        // console.log(element, index);
        console.log(element, boughtStock.stockName);
        console.log(element.name == boughtStock.stockName);
        if (element.name == boughtStock.stockName) {
          console.log("Bought More Stock");
          this.$store.commit("buyMoreStock", boughtStock);
        } else {
          console.log("Bought New Stock");
          this.$store.commit("buyNewStock", boughtStock);
        }
      });
      // Dev Comment: I dont like how you have to type in as a string in the commit, leads to a lot of mistakes.
      // I would make a mutation schema and export into this file and call it  store.schema.stockBuy
      // which will return string of stockBuy just to make less mistakes and add more functionality
      // getUserStocks getter does not exist in the store
      // That is why it returned undefined
      console.log(this.$store.getters.getUserStocks); // this mistake would have been avoided with typescript
      // console.log(this.$store.getters.userStocksGetter); // the user now has stock of whatever HE just boght
    }
  },
  async beforeMount() {
    await this.stockGetter();
  }
});
</script>

<style>
</style>