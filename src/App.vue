<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
// Components and Data
import Navbar from "./components/Navbar.vue";
import marketData from "@/stockData.json";

// Classes
import { Market } from "@/Classes/Market";
import { Stock } from "./Classes/Stock";
import { Portfolio, newStockTransaction } from "./Classes/Portfolio";

// Store
import store from "@/store";
import { portfolioStoreSchema } from "@/storeModules/portfolioStore";
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
    marketData.stocks.forEach((stock: any) => {
      formatedStocks.push(
        new Stock(stock.value, stock.stockQuantity, stock.name, stock.symbol)
      );
    });
    let market: Market = new Market(formatedStocks);
    market.startMarket();
    let randomId = "fakeAssId";

    let singleStock: newStockTransaction = {
      stockName: formatedStocks[0].getStockName(),
      stockData: {
        priceAtTransaction: formatedStocks[0].getCurrentPrice(),
        amount: 1,
        time: new Date()
      }
    };

    let newPortfolio = new Portfolio(randomId, "brayan", 10000, [singleStock]);
    store.commit(
      portfolioStoreSchema.mutations.updateMyId,
      newPortfolio.getPortfolioId()
    );
    store.commit(portfolioStoreSchema.mutations.addPortfolio, newPortfolio);
    console.log(store.getters[portfolioStoreSchema.getters.getMyPortfolio]);
  }
};
</script>

 <style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>

