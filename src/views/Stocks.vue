<template>
  <div>
    <!-- <b-button
      @click="APIData('AAPL'); APIData('GOOGL'); APIData('MSFT'); APIData('AMZN'); APIData('FB'); APIData('INTC');"
    >Get API Data</b-button>-->
    <b-card-group deck v-if="dataReady">
      <stock-card
        v-for="(stock, key) in stockData"
        :key="key"
        :stock="stockData"
        :keyProp="key"
      ></stock-card>
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
      stockNameList: Array(),
    };
  },
  async mounted() {
    // console.log(this.checkForData());
    if (this.stockData[0] === undefined) {
      await this.getDatabaseDailyData();
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
    },
  },
  computed: {
    stockData() {
      let stocks: Array<Object> = store.state.marketData.formatedStocks;
      if (stocks[0] !== undefined) {
        this.checkData(stocks);
      } else {
        // console.log("Data is new");
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
    },
  },
  methods: {
    async callAPI() {
      let stockList: Array<string> = [
        "AAPL",
        "GOOGL",
        "MSFT",
        "AMZN",
        "FB",
        "INTC",
      ];
      await stockList.forEach(async (symbol: string) => {
        store.dispatch("getApiDaily", symbol);
      });
      console.log("It called");
      // this.getDatabaseDailyData();
    },
    // ? For some reason if you typecast a function you can't use any global functions and variables
    checkData(stocks: { [k: string]: any }) {
      let dayOfWeek: Object = moment().weekday();
      let dateAndHour: string = "YYYY-MM-DD HH:mm:ss";
      let isWeekend: boolean = dayOfWeek === 6 || dayOfWeek === 0;
      let today: string = moment().format("YYYY-MM-DD");
      let yesterday: string = moment(moment().subtract(1, "day")).format(
        "YYYY-MM-DD"
      );
      let twoDaysAgo: string = moment(moment().subtract(2, "day")).format(
        "YYYY-MM-DD"
      );
      let timeInHours: string = moment(`${today} 15:00:00`, dateAndHour).format(
        dateAndHour
      );
      let dataIsUpToDate: boolean = Boolean();
      // ! Make this check for data in db as well
      //  Todo: moment(moment().format(dateAndHour)).isSameOrAfter(timeInHours)
      for (let stock of Object.keys(stocks)) {
        let lastRefreshed: string = stocks[stock]["stockData"]["lastRefreshed"];
        let checkIfAfterHours: boolean = moment(
          moment().format(dateAndHour)
        ).isSameOrAfter(timeInHours);
        if (isWeekend === false && checkIfAfterHours === true) {
          console.log("It's not the weekend");
          console.log(`Need to call API it's after ${timeInHours}`);
          // this.callAPI();
          // Todo: Check If I need this break, I'm pretty sure it's need
          break;
        } else if (dayOfWeek === 6 && lastRefreshed !== yesterday) {
          console.log(`Need to call API for data from ${yesterday}`);
          // this.callAPI();
          dataIsUpToDate = true;
          break;
        } else if (dayOfWeek === 0 && lastRefreshed !== twoDaysAgo) {
          console.log(`Need to call API for data from ${twoDaysAgo}`);
          break;
        }
      }
      // Object.keys(stocks).forEach((stock: string) => {

      // });
      if (isWeekend === true) {
        console.log("Market's closed, Wall Street is doing the dirty");
      }
      return dataIsUpToDate;
    },
    async APIData(stock: any) {
      this.$store.dispatch("getApiDaily", stock);
    },
    async getDatabaseDailyData() {
      await store.dispatch("getDatabaseDailyData");
    },
  },
  components: {
    StockCard,
  },
});
</script>
