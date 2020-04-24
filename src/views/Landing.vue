<template>
  <div>
    <div v-if="signedIn">Yo whats up you signed in</div>
    <div v-else>Make An actual landing page</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

//router
import router from "@/router";

// store
import store from "@/store";
import { accountStoreSchema } from "@/storeModules/accountStore";
import { portfolioStoreSchema } from "../storeModules/portfolioStore";

// components
import PortfolioStockCard from "@/components/PortfolioStockCard.vue";

// Classes
import { Stock } from "../Classes/Stock";
import { Portfolio, userStock } from "../Classes/Portfolio";

export default Vue.extend({
  name: "landing",
  data() {
    return {
      signedIn: Boolean,
      dataReady: Boolean
    };
  },
  async created() {
    this.signedIn = store.getters[accountStoreSchema.getters.getSignedInStatus];
    await store
      .dispatch("getMyPortfolioData")
      .then(myData => {
        if (myData.exists) console.log(myData);
        else alert("You do not have any data, would you like to set up data?");
      })
      .catch(err => {
        console.error(err);
      });
  },
  methods: {},
  computed: {
    myStockData() {
      let allStocks: Array<userStock> = [];
      let stockNames: Array<string> = this.myPortfolio.getCurrentlyOwnedStocks();
      console.log(stockNames);
      stockNames.forEach(stockName => {
        let stockData: userStock | undefined = this.myPortfolio.getStockData(
          stockName
        );
        console.log(stockData);
        if (stockData != undefined) allStocks.push(stockData);
      });
      console.log(allStocks);
      return allStocks;
    },
    myPortfolio(): Portfolio {
      return store.getters[portfolioStoreSchema.getters.getMyPortfolio];
    }
  }
});
</script>