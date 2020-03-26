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
  },
  methods: {
    initializeStocks() {
      this.stockData = store.getters.getAllStocks;
    }
  },
  components: {
    StockCard
  }
});
</script>
