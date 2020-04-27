<template>
  <div>
    <p>Get API Data then format</p>
    <b-button
      @click="APIData('AAPL'); APIData('GOOGL'); APIData('MSFT'); APIData('AMZN')"
    >Get API Data</b-button>
    <b-button @click="getDatabaseData">Get Database Data</b-button>
    <b-form-textarea
      id="textarea"
      v-model="text"
      placeholder="Enter something..."
      rows="3"
      max-rows="6"
    ></b-form-textarea>
    <pre class="mt-3 mb-0">{{ text }}</pre>
    <b-card-group deck v-if="dataReady">
      <stock-card v-for="(stock, key) in stockData" :key="key" :stock="stockData" :keyProp="key"></stock-card>
    </b-card-group>
    <b-button @click="formatDatabaseData">Get Stock Data veux</b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import StockCard from "../components/StockCard.vue";
export default Vue.extend({
  name: "stocksView",
  data() {
    return {
      text: "",
      stockData: Array(),
      dataReady: false,
      moreStockData: Array(),
      stock: null,
      stockNameList: Array()
    };
  },
  async mounted() {
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
  methods: {
    formatDatabaseData() {
      console.log(this.$store.getters.getStocks);
      let stocks = this.$store.getters.getStocks;
      stocks.forEach(stock => {
        let metaData = stock.data["Meta Data"];
        let priceData = stock.data["Time Series (Daily)"]["2020-04-15"];
        let formatedLocalData: stockDataFormat = {
          stockData: {
            name: metaData["2. Symbol"],
            open: Number(priceData["1. open"]),
            high: Number(priceData["2. high"]),
            low: Number(priceData["3. low"]),
            close: Number(priceData["4. close"]),
            volume: Number(priceData["5. volume"]),
            lastRefreshed: metaData["3. Last Refreshed"]
          }
        };
        this.stockData.push(formatedLocalData);
      });
    },
    async APIData(stock) {
      this.$store.dispatch("getApiData", stock);
    },
    getDatabaseData() {
      this.$store.dispatch("getDatabaseStockData");
    },
    initializeStocks() {
      this.stockData = store.getters.getAllStocks;
    }
  },
  components: {
    StockCard
  }
});

interface stockDataFormat {
  stockData: {
    name: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    lastRefreshed: string;
  };
}
</script>
