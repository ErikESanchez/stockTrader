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
import router from "../router";
export default Vue.extend({
  name: "singleStock",
  mounted() {
    this.getStockData();
  },
  methods: {
    async getStockData() {
      const stockSymbol = router.currentRoute.params.stock;
      if (stockSymbol != undefined && stockSymbol.length > 1) {
        let payload: TIME_SERIES_DAILY = {
          function: "TIME_SERIES_DAILY",
          symbol: stockSymbol
        };
        const result = await store.dispatch(
          marketStoreSchema.actions.getStockQuote,
          payload
        );
        console.log(result);
      }
    }
  }
});
</script>
