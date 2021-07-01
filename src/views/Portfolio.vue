<template>
  <div class="container">
    <div class="row">
      <portfolio-stock-card
        class="col-5"
        v-for="(stock, index) in portfolio.ownedStocks"
        :stock="stock"
        :key="index"
      />
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
  computed: mapGetters({ portfolio: "portfolio/portfolio" }),
});
</script>

<style></style>
