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
import store from "@/store";
import moment from "moment";

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
    // console.log(this.checkForData());
    if (this.stockData[0] === undefined) {
      await this.getDatabaseDailyData();
    }
    console.log("bruh");
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
      let stocks: Array<Object> = store.state.marketData.formatedStocks;
      if (stocks[0] !== undefined && this.checkData(stocks) === false) {
        console.log("Need to call API");
      } else {
        console.log("Data is new");
      }
      // let yesterdaysDate: string = moment(moment().subtract(1, "day")).format(
      //   "YYYY-MM-DD"
      // );
      // stocks.forEach((stock: any) => {
      // let dateOfStock: string = stock["stockData"]["lastRefreshed"];
      // Todo: Make this account for weekends
      // console.log(dateOfStock);
      // if (this.checkData() !== true && yesterdaysDate !== dateOfStock)
      // console.log("Bruh, we need new API data");
      // });
      return stocks;
    }
  },
  methods: {
    async callAPI() {
      let stockList: Array<string> = [
        "AAPL",
        "GOOGL",
        "MSFT",
        "AMZN",
        "FB",
        "INTC"
      ];
      await stockList.forEach(async (symbol: string) => {
        store.dispatch("getApiDaily", symbol);
      });
      // this.getDatabaseDailyData();
    },
    checkData: (stocks: Object): boolean => {
      let dayOfWeek: Object = moment().weekday();
      let dateAndHour: string = "YYYY-MM-DD HH:mm:ss";
      let isWeekend: boolean = dayOfWeek === 6 || dayOfWeek === 0;
      let today: string = moment().format("YYYY-MM-DD");
      let yesterday: string = moment(moment().subtract(1, "day")).format(
        "YYYY-MM-DD"
      );
      let timeInHours: string = moment(`${today} 15:00:00`, dateAndHour).format(
        dateAndHour
      );
      let newData: boolean = Boolean();
      console.log(newData);
      // moment(moment().format(dateAndHour)).isSameOrAfter(timeInHours);
      // ! Make this check for data in db as well
      if (isWeekend === false) {
        // if(m)
        // console.log("burh");
        // if(moment())
        return false;
      } else if (isWeekend === true) {
        // console.log("Market's closed, Wall Street is doing the dirty");
      }
      // if (isWeekend === true) {
      //   // ! Make this account for holidays, no clue how I'm going to do it but I have to
      // } else if (isWeekend === false && moment().isSameOrAfter(timeInHours)) {
      //   console.log("Bruh, you need new data.");
      // }
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
