<template>
  <div>
    <b-card-group deck v-if="dataReady">
      <stock-card v-for="stock in stockData" :key="stock.name" :stock="stock"></stock-card>
    </b-card-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import StockCard from "../components/StockCard.vue";
import marketData from "@/stockData.json";
import { Stock } from "../Classes/Stock";
import { Portfolio } from "../Classes/Portfolio";
import { portfolioStoreSchema } from "@/storeModules/portfolioStore";

export default Vue.extend({
  name: "stocksView",
  data() {
    return {
      stockData: Array<Stock>(),
      dataReady: false,
      apiStockData: {},
      myPortfolio: Portfolio
    };
  },
  async mounted() {
    this.getMyData();
    this.initializeStocks();
    this.dataReady = true;
  },
  methods: {
    getMyData() {
      this.myPortfolio =
        store.getters[portfolioStoreSchema.getters.getMyPortfolio];
    },
    initializeStocks() {
      let formatedStocks: Array<Stock> = [];
      marketData.stocks.forEach((stock: any) => {
        formatedStocks.push(
          new Stock(stock.value, stock.stockQuantity, stock.name)
        );
      });
      this.stockData = formatedStocks;
    }
  },
  components: {
    StockCard
  }
});
</script>
