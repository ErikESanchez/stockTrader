<template>
  <div id="app">
    <div v-if="dataLoaded">
      <navbar></navbar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// Components and Data
import Navbar from "./components/Navbar.vue";
import marketData from "@/stockData.json";

// Classes
import { Market } from "@/Classes/Market";
import { Stock } from "./Classes/Stock";
import { Portfolio, newStockTransaction } from "./Classes/Portfolio";

// Store
import store from "@/store";
import { accountStoreSchema } from "@/storeModules/accountStore";
import { portfolioStoreSchema } from "@/storeModules/portfolioStore";

// Firebase
import { firebaseData } from "@/firebase";
export default Vue.extend({
  name: "App",
  data() {
    return {
      signedIn: false,
      dataLoaded: false
    };
  },
  created() {
    // Todo: Add all stocks to to a collection in firebase
    let formatedStocks: Array<Stock> = [];
    marketData.stocks.forEach((stock: any) => {
      formatedStocks.push(
        new Stock(stock.value, stock.stockQuantity, stock.name, stock.symbol)
      );
    });
    let market: Market = new Market(formatedStocks);
    market.startMarket();
    let randomId = "fakeAssFirebaseId";

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
  },
  async mounted() {
    await firebaseData.auth().onAuthStateChanged(async user => {
      if (user) {
        this.signedIn = true;
        store.commit(accountStoreSchema.mutations.changedSignedInStatus, true);
        store.commit(accountStoreSchema.mutations.updateAccountInfo, user);
        console.log(store.getters[accountStoreSchema.getters.getMyAccont]);
        // Todo: Get user Portfolio Data
        // If user does not have account make one, but prompt the user for one first
        console.log(user);
        this.dataLoaded = true;
      } else {
        store.commit(accountStoreSchema.mutations.changedSignedInStatus, false);
        // Todo: get rid of data from portfolio
        console.log("$$$ Sign Up to get some dolla dolla bills yall $$$");
        this.dataLoaded = true;
      }
    });
  },
  components: {
    Navbar
  }
});
</script>
<style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>

