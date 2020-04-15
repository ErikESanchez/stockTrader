<template>
  <div>
    <b-button @click="testData">getTEst data</b-button>
    <b-card-group deck v-if="dataReady">
      <stock-card v-for="stock in stockData" :key="stock.name" :stock="stock"></stock-card>
    </b-card-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import store from "@/store";
// import { TradeStocks } from "../Classes/TradeStocks";
import StockCard from "../components/StockCard.vue";
import { TIME_SERIES_DAILY } from "@/storeModules/marketData";
import { apiStockData } from "../store";
import { apikey } from "@/apiKey"; // apikey must be lower case
import { Stock } from "../Classes/Stock";
export default Vue.extend({
  name: "stocksView",
  data() {
    return {
      stockData: Array<Stock>(),
      dataReady: false,
      apiStockData: {}
    };
  },
  async mounted() {
    this.initializeStocks();
    this.dataReady = true;
  },
  methods: {
    async testData() {
      let testPayload: TIME_SERIES_DAILY = {
        function: "TIME_SERIES_DAILY",
        symbol: "IBM",
        interval: "30min",
        apikey: apikey,
        outputsize: "compact"
      };
      await this.$store
        .dispatch("getStockQuote", testPayload)
        .then(res => {
          console.log(res);
          let formatedApiData: apiStockData = {
            name: res.data
          };
          this.apiStockData = formatedApiData;
        })
        .catch(err => {
          console.log(err);
        });
    },
    initializeStocks() {
      // let tradeStock: TradeStocks = new TradeStocks();
      // this.stockData = ;s
    }
  },
  components: {
    StockCard
  }
});
</script>
