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
import { UserStock } from "@/store";
import PortfolioStockCard from "@/components/PortfolioStockCard.vue";
import store from "@/store";
import { mapState } from "vuex";

export default Vue.extend({
  name: "portfolio",
  components: {
    PortfolioStockCard,
  },
  computed: mapState("portfolio", ["portfolio"]),
});
</script>

<style></style>
