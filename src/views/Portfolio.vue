<template>
  <div>
    <p>Portfolio</p>
    <b-card-group deck v-if="dataReady">
      <portfolio-stock-card
        v-for="stock in stockData"
        :key="stock"
        :stock="stock"
        :stockAmount="stockAmount"
      ></portfolio-stock-card>
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
      stockData: Array<userStock>(),
      stockAmount: new Number()
    };
  },
  mounted() {
    this.initializeUserStocks();
    this.dataReady = true;
  },
  methods: {
    initializeUserStocks() {
      this.stockData = this.$store.getters.getUserStocks;
      let totalAmount = new Array();
      // ! index in the forEach loop is a key!
      Object.entries(this.stockData).forEach(stock => {
        for (let i = 0; i < stock[1]["stocksOwned"].length; i++) {
          let amount = Number(stock[1]["stocksOwned"][i]["amount"]);
          totalAmount.push(amount);
          this.stockAmount = totalAmount.reduce((a, b) => {
            return a + b;
          }, 0);
          console.log(this.stockAmount);
        }
      });
    }
  }
});
</script>

<style>
</style>