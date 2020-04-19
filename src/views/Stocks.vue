<template>
  <div>
    <p>Get API Data then format</p>
    <b-button @click="APIData()">Get API Data</b-button>

    <b-button @click="formatLocalData">Format Local Data</b-button>
    <b-card-group deck v-if="dataReady">
      <stock-card v-for="(stock, key) in stockData" :key="key" :stock="stockData" :keyProp="key"></stock-card>
    </b-card-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import StockCard from "../components/StockCard.vue";
import { TIME_SERIES_DAILY } from "@/storeModules/marketData";
import { apiStockData } from "../store";
import apikey from "../apikey"; // apikey must be lower case
import { Stock } from "../Classes/Stock";
export default Vue.extend({
  name: "stocksView",
  data() {
    return {
      stockData: Object(),
      dataReady: false
    };
  },
  async mounted() {
    // this.initializeStocks();
    this.formatLocalData();
    this.dataReady = true;
    // this.APIData("AAPL");
  },
  methods: {
    formatLocalData() {
      let localData = JSON.parse(localStorage.getItem("AAPL"));
      console.log();

      let formatedLocalData: stockData = {
        stockData: {
          name: localData.data["Meta Data"]["2. Symbol"],
          lastRefreshed: localData.data["Meta Data"]["3. Last Refreshed"],
          endOfDayPrice:
            localData.data["Time Series (Daily)"]["2020-04-15"]["4. close"]
        }
      };
      this.stockData = formatedLocalData;

      console.log(formatedLocalData, localData);
    },
    async APIData() {
      let testPayload: TIME_SERIES_DAILY = {
        function: "TIME_SERIES_DAILY",
        symbol: "AAPL",
        interval: "30min",
        apikey: apikey.state.apikey,
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
          localStorage.setItem("AAPL", JSON.stringify(res));
        })
        .catch(err => {
          console.log(err);
        });
    },
    initializeStocks() {
      this.stockData = store.getters.getAllStocks;
    }
  },
  components: {
    StockCard
  }
});

interface stockData {
  stockData: {
    name: string;
    lastRefreshed: string;
    endOfDayPrice: string;
  };
}
</script>
