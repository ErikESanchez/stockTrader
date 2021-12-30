<template>
  <div class="container">
    <div class="row">
      <stock-card
        class="col-sm"
        v-for="(stock, index) in formattedStocks"
        :stock="stock"
        :funds="portfolio.funds"
        :key="index"
      >
      </stock-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import StockCard from "../components/StockCard.vue";
import store from "@/store";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "stocksView",
  computed: {
    ...mapGetters({
      formattedStocks: "marketData/formattedStocks",
      portfolio: "portfolio/portfolio",
    }),
  },
  watch: {
    formattedStocks(event) {
      console.log(event);
    },
  },
  methods: {
    async getDatabaseDailyData() {
      await store.dispatch("marketData/getDatabaseDailyData");
    },
  },
  components: {
    StockCard,
  },
});
</script>
