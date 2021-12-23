<template>
  <div>
    <div class="container">
      <div class="row">
        <portfolio-stock-card
          class="col-sm"
          v-for="(stock, index) in portfolio.ownedStocks"
          :stock="stock"
          :key="index"
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
  mounted() {},
  methods: {},
  computed: { ...mapGetters({ portfolio: "portfolio/portfolio" }) },
});
</script>

<style></style>
