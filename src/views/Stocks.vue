<template>
  <div>
    <!-- <b-button
      @click="APIData('AAPL'); APIData('GOOGL'); APIData('MSFT'); APIData('AMZN'); APIData('FB'); APIData('INTC');"
    >Get API Data</b-button>-->
    <b-card-group deck v-if="dataReady">
      <stock-card
        v-for="(stock, key) in formatedStocks"
        :key="key"
        :stock="formatedStocks"
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
import { mapState } from "vuex";
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
    if (this.formatedStocks[0] === undefined) {
      await this.getDatabaseDailyData();
    }
    await store.dispatch("getUserFirebaseStocks");
    this.dataReady = true;
  },
  computed: mapState("marketData", ["formatedStocks"]),
  // stockData() {
  //   let stocks: Array<Object> = store.state.marketData.formatedStocks;
  //   return stocks;
  // },
  methods: {
    async callAPI() {
      let stockList: Array<string> = ["AAPL", "GOOGL", "MSFT", "AMZN", "FB"];
      await stockList.forEach(async (symbol: string) => {
        store.dispatch("marketData/getApiDaily", symbol);
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

          dataIsUpToDate = true;
          // Todo: Check If I need this break, I'm pretty sure it's need
          break;
        } else if (dayOfWeek === 6 && lastRefreshed !== yesterday) {
          console.log(`Need to call API for data from ${yesterday}`);
          // this.callAPI();
          dataIsUpToDate = true;
          break;
        } else if (dayOfWeek === 0 && lastRefreshed !== twoDaysAgo) {
          console.log(`Need to call API for data from ${twoDaysAgo}`);
          dataIsUpToDate = true;
          // this.callAPI();
          break;
        }
      }
      if (isWeekend === true) {
        console.log("Market's closed, Wall Street is doing the dirty");
      }
      console.log(dataIsUpToDate);
      return dataIsUpToDate;
    },
    async APIData(stock: any) {
      this.$store.dispatch("marketData/getApiDaily", stock);
    },
    async getDatabaseDailyData() {
      await store.dispatch("marketData/getDatabaseDailyData");
    },
  },
  components: {
    StockCard,
  },
});
</script>
