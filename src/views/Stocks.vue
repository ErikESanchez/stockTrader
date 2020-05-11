<template>
  <div>
    <!-- APIData('GOOGL'); APIData('MSFT'); APIData('AMZN') -->
    <!-- <b-button
      @click="APIData('AAPL'); APIData('GOOGL'); APIData('MSFT'); APIData('AMZN'); APIData('FB'); APIData('INTC'); APIData('TSLA'); APIData('NVDA'); APIData('AMD') "
    >Get API Data</b-button>-->
    <b-card-group deck v-if="dataReady">
      <stock-card v-for="(stock, key) in stockData" :key="key" :stock="stockData" :keyProp="key"></stock-card>
    </b-card-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import StockCard from "../components/StockCard.vue";
// import * as moment from "moment";
import store from "@/store";

export default Vue.extend({
  name: "stocksView",
  data() {
    return {
      text: "",
      dataReady: false,
      moreStockData: Array(),
      stock: null,
      stockNameList: Array()
    };
  },
  async mounted() {
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
      return store.state.marketData.formatedStocks;
    }
  },
  methods: {
    async APIData(stock) {
      await store.dispatch("getApiData", stock);
    },
    async getDatabaseData() {
      await store.dispatch("getDatabaseStockData");
    }
  },
  components: {
    StockCard
  }
});
</script>
