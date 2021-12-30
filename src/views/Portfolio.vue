<template>
  <div>
    <div class="container">
      <div class="row">
        <portfolio-stock-card
          class="col-sm"
          v-for="(ownedStock, symbol) in portfolio.ownedStocks"
          :ownedStock="ownedStock"
          :stock="formattedStocks[symbol]"
          :symbol="symbol"
          :key="symbol"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import PortfolioStockCard from "@/components/PortfolioStockCard.vue";
import { mapGetters, mapState } from "vuex";
export default Vue.extend({
  name: "portfolio",
  components: {
    PortfolioStockCard,
  },
  watch: {
    portfolio(event) {
      console.log('Portfolio Watcher', event);
    },
  },
  computed: {
    ...mapState({ portfolio: "portfolio/portfolio" }),
    ...mapGetters({ formattedStocks: "marketData/formattedStocks", portfolio: "portfolio/portfolio" }),
  },
});

// <template>
//   <div>
//     <div v-for="(stock, index) in portfolio.ownedStocks" :key="index">
//       {{ index }}
//     </div>
//   </div>
// </template>
</script>

<style></style>
