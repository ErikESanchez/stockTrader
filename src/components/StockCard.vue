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
          <b-form-input :id="`type-${type}`" :type="type">{{toBuy}}</b-form-input>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      stocks: null, // Dev Note:  At least initialize with empty [] to get functionality 
      toBuy: 1,
      types: ["number"] // Dev Note:  the heck is this ?
    };
  },

  methods: {
    stockGetter() {
      this.stocks = this.$store.getters.getStocks;
    },
    newPrices() {
      this.BMW_Stock = this.$store.commit(
        "generateStockPrices",
        this.BMW_Stock
      );
    },
    boughtStock(stock) {
      console.log(stock);
      //   name: "BMW"
      // value: "200$"
      // numberOfStocks: 1000
      console.log(stock.name, stock.value);
      Array.prototype.forEach(element => {
        console.log(element);
      });
      let providedName = stock.name;
      let storeStock = this.$store.getters.getStocks;
      let selectedStock = 0;
      // let stockValue = storeStock[stock.name];
      //   console.log(stockValue);
      storeStock.forEach(stock => {
        if (stock.name == providedName) {
          selectedStock = stock.value;
        }
      });
      console.log(selectedStock);
      // for (let i = 0; i < storeStock.length; i++) {
      //   if (stock.name == storeStock[i].name) {
      //     this.$store.commit("userBoughtStocks", stock);
      //   } else {
      //     console.log("heloo");
      //   }
      // }
      console.log(this.$store.getters.getUserStocks);
    }
  },
  async beforeMount() {
    await this.stockGetter();
  }
});
</script>

<style>
</style>