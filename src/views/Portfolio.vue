<template>
  <div>
    <div class="container">
      <div class="row">
        <portfolio-stock-card
          class="col-sm"
          v-for="(ownedStock, symbol) in portfolio.ownedStocks"
          :ownedStock="ownedStock"
          :stockData="formattedStocks[symbol]"
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
import { mapGetters } from "vuex";
export default Vue.extend({
  name: "portfolio",
  components: {
    PortfolioStockCard,
  },
  data() {
    return {};
  },
  watch: {
    stockData(event){
      console.log(event)
    }
  },
  mounted() {},
  methods: {},
  computed: {
    ...mapGetters({ portfolio: "portfolio/portfolio" }),
    ...mapGetters({ formattedStocks: "marketData/formattedStocks" }),
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
