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
import {
  portfolioStoreSchema,
  newPortfolioData,
  portfolioConverter
} from "@/storeModules/portfolioStore";

// Firebase
import { firebaseData } from "@/firebase";
export default Vue.extend({
  name: "App",
  data() {
    return {
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
  },
  // ! Heres the problem fam
  // When creating a new portfolio class in the constructor I need of type initialStock to be
  // newStockTransaction but all the data im getting from fb is an [] with the name of the stock,
  // and how many I own. constructor needs it to be a type of new type of tr.
  // Either change the class || cross reference data in db and update it to format it correctly in constructor
  // If latter, going to have to start making stocks with their prices
  async mounted() {
    await firebaseData.auth().onAuthStateChanged(async user => {
      if (user) {
        store.commit(accountStoreSchema.mutations.changedSignedInStatus, true);
        store.commit(accountStoreSchema.mutations.updateAccountInfo, user);
        await store
          .dispatch("getMyPortfolioData")
          .then(myData => {
            let formatedPortfolioData: newPortfolioData = portfolioConverter.fromFbPortfolioData(
              myData.id,
              myData.data()
            );
            // Todo: have the transacion history data empty
            let myPortfolioData: Portfolio = new Portfolio(
              formatedPortfolioData.id,
              formatedPortfolioData.name,
              formatedPortfolioData.avaibleFunds,
              [],
              formatedPortfolioData.portfolioWorth
            );
            store.commit("addMyPortfolio", myPortfolioData);
            // store.commit("addPortfolio", myPortfolioData);
            this.dataLoaded = true;
          })
          .catch(err => {
            store.commit("changedSignedInStatus", false);
            this.dataLoaded = false;
            console.error(err);
          });
      } else {
        store.commit(accountStoreSchema.mutations.changedSignedInStatus, false);
        this.dataLoaded = true;
        console.log("$$$ Sign Up to get some dolla dolla bills yall $$$");
      }
    });
  },
  methods: {},
  components: {
    Navbar
    this.$store.dispatch("fetchUser");
    this.funds = this.$store.getters.totalFunds;
  }
});
</script>
<style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>

