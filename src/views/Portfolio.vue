<template>
  <div>
    <!-- Make jumbotron: add textData to props in jumbortron-->
    <p>Portfolio</p>
    <b-card-group deck v-if="dataReady">
      <portfolio-stock-card v-for="stock in myStockData" :key="stock.name" :stock="stock"></portfolio-stock-card>
    </b-card-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PortfolioStockCard from "../components/PortfolioStockCard.vue";
import { Stock } from "../Classes/Stock";
import store from "../store";
import { portfolioStoreSchema } from "../storeModules/portfolioStore";
import { Portfolio, userStock } from "../Classes/Portfolio";

export default Vue.extend({
  name: "portfolio",
  components: {
    PortfolioStockCard
  },
  data() {
    return {
      dataReady: false,
      stockAmount: new Number()
    };
  },
  mounted() {
    this.dataReady = true;
    console.log("kek");
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

<style>
</style>