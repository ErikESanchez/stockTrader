<template>
  <div class="container">
    <div class="row">
      <stock-card
        class="col-sm"
        v-for="(stock, index) in formatedStocks"
        :stock="stock"
        :key="index"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import StockCard from "../components/StockCard.vue";
import { Market } from "@/Classes/Market";
import store from "@/store";
import { mapGetters } from "vuex";
import moment from "moment";

export default Vue.extend({
  name: "stocksView",
  // async mounted() {
  //   if (this.formatedStocks[0] === undefined) {
  //     await this.getDatabaseDailyData();
  //     console.log('bruh')
  //   }
  // },
  computed: mapGetters({ formatedStocks: "marketData/formatedStocks" }),
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
