<template>
  <div>
    <p class="text-white">Portfolio</p>
    <portfolio-stock-card
      v-for="(stock, index) in portfolio.ownedStocks"
      :stock="stock"
      :key="index"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { UserStock } from "@/store";
import PortfolioStockCard from "@/components/PortfolioStockCard.vue";
import store from "@/store";
import { mapState } from "vuex";

export default Vue.extend({
  name: "portfolio",
  components: {
    PortfolioStockCard,
  },
  data() {
    return {
      dataReady: false,
      stockData: Array<UserStock>(),
      stockAmount: new Number(),
    };
  },
  computed: mapState("portfolio", ["portfolio"]),
});
</script>

<style></style>
