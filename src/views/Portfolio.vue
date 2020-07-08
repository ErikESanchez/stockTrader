<template>
  <div>
    <p>Portfolio</p>
    <b-card-group deck>
      <portfolio-stock-card
        v-for="(stock, index) in portfolio.ownedStocks"
        :stock="stock"
        :key="index"
      ></portfolio-stock-card>
    </b-card-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { userStock } from "@/store";
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
      stockData: Array<userStock>(),
      stockAmount: new Number(),
    };
  },
  mounted() {},
  computed: mapState("portfolio", ["portfolio"]),
});
</script>

<style></style>
