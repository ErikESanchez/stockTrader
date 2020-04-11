<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Navbar from "./components/Navbar.vue";
import { Market } from "@/Classes/Market";
import marketData from "@/stockData.json";
import { Stock } from "./Classes/Stock";
export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {};
  },
  created() {
    let formatedStocks: Array<Stock> = [];
    marketData.stocks.forEach(stock => {
      formatedStocks.push(
        new Stock(stock.value, stock.stockQuantity, stock.name)
      );
    });
    let market: Market = new Market(formatedStocks);
    market.startMarket();
    console.log(market);
  }
};
</script>

 <style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>

