<template>
  <div>
    <b-card-group deck v-if="dataReady">
      <stock-card v-for="stock in stockData" :key="stock.name" :stock="stock"></stock-card>
    </b-card-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import store from "@/store";
import { TradeStocks } from "../Classes/TradeStocks";
import StockCard from "../components/StockCard.vue";
import { Stock } from "../Classes/Stock";
export default Vue.extend({
  name: "stocksView",
  data() {
    return {
      stockData: Array<Stock>(),
      dataReady: false
    };
  },
  mounted() {
    this.initializeStocks();
    this.dataReady = true;
    console.log(TradeStocks);
  },
  methods: {
    initializeStocks() {
      let tradeStock: TradeStocks = new TradeStocks();

      this.stockData = tradeStock.getAllStocks;
    }
  },
  components: {
    StockCard
  }
});
</script>
