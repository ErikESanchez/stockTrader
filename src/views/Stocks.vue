<template>
  <div>
    <!-- <b-button
      @click="APIData('AAPL'); APIData('GOOGL'); APIData('MSFT'); APIData('AMZN'); APIData('FB'); APIData('INTC');"
    >Get API Data</b-button>-->
    <b-card-group deck v-if="dataReady">
      <stock-card v-for="(stock, key) in stockData" :key="key" :stock="stockData" :keyProp="key"></stock-card>
    </b-card-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import StockCard from "../components/StockCard.vue";
import { Market } from "@/Classes/Market";
// import * as moment from "moment";
import store from "@/store";
import moment from "moment";
import { any } from "async";

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
    if (this.checkForData() === false) {
      console.log("Called API");
      let stockList: Array<string> = [
        "AAPL",
        "GOOGL",
        "MSFT",
        "AMZN",
        "FB",
        "INTC"
      ];
      await stockList.forEach(async (symbol: string) => {
        this.$store.dispatch("getApiDaily", symbol);
      });
      this.getDatabaseDailyData();
    } else {
      console.log("Didn't call the API");
      this.getDatabaseDailyData();
    }
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
      return store.state.marketData.formatedStocks;
    }
  },
  methods: {
    checkForData() {
      let dayOfWeek: Object = moment().weekday();
      let isWeekend: boolean = dayOfWeek === 6 || dayOfWeek === 0;
      let timeInHours: string = moment().format("HH: mm: ss");
      console.log(moment().format("HH: mm: ss"));
      // ! Make this check for data in db as well
      if (isWeekend === true) {
        console.log(
          "Bruh, the market ain't open. Wall Street doing the dirty right now."
        );
        return true;
        // ! Make this account for holidays, no clue how I'm going to do it but I have to
      } else if (isWeekend === false || moment().isSameOrAfter(timeInHours)) {
        console.log("Bruh, you need new data.");
        return false;
      }
    },
    async APIData(stock: any) {
      this.$store.dispatch("getApiDaily", stock);
    },
    async getDatabaseDailyData() {
      await store.dispatch("getDatabaseDailyData");
    }
  },
  components: {
    StockCard
  }
});
</script>
