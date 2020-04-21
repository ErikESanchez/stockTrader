<template>
  <div>
    <h1>Load the real data for a single stock</h1>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import store from "@/store";
import {
  marketStoreSchema,
  TIME_SERIES_DAILY
} from "@/storeModules/marketStore";
export default Vue.extend({
  name: "singleStock",
  props: {
    stockSymbol: String
  },
  mounted() {
    // this.getStockData();
  },
  methods: {
    async getStockData() {
      let payload: TIME_SERIES_DAILY = {
        function: "TIME_SERIES_DAILY",
        symbol: this.stockSymbol
      };
      store.dispatch(marketStoreSchema.actions.getStockQuote, this.stockSymbol);
    }
  }
});
</script>
