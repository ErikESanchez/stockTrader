<template>
  <div>
    <p>Portfolio</p>
    <button @click="getAllUserStockData">dfsdfsdsf</button>
    <b-card-group deck v-if="dataReady">
      <portfolio-stock-card v-for="stock in stockData" :key="stock.name" :stock="stock"></portfolio-stock-card>
    </b-card-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { userStock } from "../store";
import PortfolioStockCard from "../components/PortfolioStockCard.vue";
export default Vue.extend({
  name: "portfolio",
  components: {
    PortfolioStockCard
  },
  data() {
    return {
      dataReady: false,
      stockData: Array<userStock>()
    };
  },
  mounted() {
    this.initializeUserStocks();
    this.dataReady = true;
  },
  methods: {
    getAllUserStockData() {
      console.log(this.stockData);
    },
    initializeUserStocks() {
      this.stockData = this.$store.getters.getUserStocks;
    }
  }
});
</script>

<style>
</style>