<template>
  <div>
    <b-card-group deck v-if="dataReady">
      <stock-card v-for="(stock, key) in stockData" :key="key" :stock="stock"></stock-card>
    </b-card-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import marketData from "@/stockData.json";
// Store
import store from "@/store";
import { portfolioStoreSchema } from "@/storeModules/portfolioStore";
import StockCard from "@/components/StockCard.vue";
// Classes
import { Stock } from "@/Classes/Stock";
import { Portfolio } from "@/Classes/Portfolio";

// import * as moment from "moment";
export default Vue.extend({
  name: "stocksView",
  data() {
    return {
      dataReady: false,
      apiStockData: {},
      myPortfolio: Portfolio,
      moreStockData: Array(),
      stock: null,
      stockNameList: Array()
    };
  },
  async mounted() {
    this.dataReady = true;
  },
  computed: {
    stockData() {
      // console.log(this.$store.state.marketData.formatedStocks);
      return this.$store.state.marketData.formatedStocks;
    }
  },
  components: {
    StockCard
  }
});
</script>
