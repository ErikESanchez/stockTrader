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
// import { TradeStocks } from "../Classes/TradeStocks";
import StockCard from "../components/StockCard.vue";
// import { Stock } from "../Classes/Stock";
// import {store} from '@/store.ts'
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
  },
  methods: {
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
