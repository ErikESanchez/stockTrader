<template>
  <div>
    <b-card-group deck v-if="dataReady">
      <stock-card v-for="(stock, key) in stockData" :key="key" :stock="stockData" :keyProp="key"></stock-card>
    </b-card-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import StockCard from "../components/StockCard.vue";
export default Vue.extend({
  name: "stocksView",
  data() {
    return {
      text: "",
      dataReady: false,
      moreStockData: Array(),
      stock: null,
      stockNameList: Array()
    };
  },
  async mounted() {
    this.getDatabaseData();
    this.dataReady = true;
  },
  watch: {
    text() {
      window.addEventListener("keydown", function(event) {
        const key = event.key;
        if (key == "Enter") {
          console.log("newStockAdded");
        }
      });
    }
  },
  computed: {
    stockData() {
      console.log(this.$store.state.marketData.formatedStocks);
      return this.$store.state.marketData.formatedStocks;
    }
  },
  methods: {
    async APIData(stock) {
      this.$store.dispatch("getApiData", stock);
    },
    async getDatabaseData() {
      this.$store.dispatch("getDatabaseStockData").then(res => {
        console.log(res);
      });
    },
    initializeStocks() {
      this.stockData = store.getters.getAllStocks;
    }
  },
  components: {
    StockCard
  }
});
</script>
