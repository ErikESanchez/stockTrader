<template>
  <div>
    <b-button @click="testData">getTEst data</b-button>
    <b-card-group deck v-if="dataReady">
      <stock-card v-for="(stock, key) in stockData" :key="key" :stock="stockData" :keyProp="key"></stock-card>
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

// import * as moment from "moment";
export default Vue.extend({
  name: "stocksView",
  data() {
    return {
      stockData: Array<Stock>(),
      dataReady: false,
      apiStockData: {},
      myPortfolio: Portfolio
      text: "",
      dataReady: false,
      moreStockData: Array(),
      stock: null,
      stockNameList: Array()
    };
  },
  async mounted() {
    this.getMyData();
    this.initializeStocks();
    this.getDatabaseData();
    this.dataReady = true;
  },
  watch: {
    text() {
      window.addEventListener("keydown", function(event) {
        const key = event.key;
        if (key == "Enter") {
          console.log("newStockAdded");
        }
      });
    }
  },
  computed: {
    stockData() {
      // console.log(this.$store.state.marketData.formatedStocks);
      return this.$store.state.marketData.formatedStocks;
    }
  },
  methods: {
    getMyData() {
      this.myPortfolio =
        store.getters[portfolioStoreSchema.getters.getMyPortfolio];
    async APIData(stock) {
      this.$store.dispatch("getApiData", stock);
    },
    async getDatabaseData() {
      this.$store.dispatch("getDatabaseStockData").then(res => {
        console.log("bruh", res);
      });
    },
    initializeStocks() {
      let formatedStocks: Array<Stock> = [];
      marketData.stocks.forEach((stock: any) => {
        formatedStocks.push(
          new Stock(stock.value, stock.stockQuantity, stock.name, stock.symbol)
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
