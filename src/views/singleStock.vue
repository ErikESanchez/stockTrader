<template>
  <div>
    <stock-chart :stockData="chartData" class="container-fluid" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import StockChart from "../components/StockChart.vue";
import store from "@/store";
import { MonthData, TimeSeriesDaily } from "@/storeModules/marketData";
import { mapGetters } from "vuex";
import moment from "moment";
import { log } from "async";
// import { ChartData, ChartOptions } from "@/components/LineChart.vue";
export default Vue.extend({
  name: "singleStock",
  components: {
    StockChart,
  },
  data() {
    return {
      loaded: false,
      chartData: Object(),
    };
  },
  created() {
    this.monthChart()
  },
  watch: {
    allStocks() {
      this.monthChart();
    },
  },
  methods: {
    async monthChart(): Promise<void> {
      const symbol: string = this.$router.currentRoute.params.stockName;
      let dataCollection: any = {
        labels: [],
        datasets: [
          {
            name: symbol,
            data: [],
          },
        ],
      };
      await store
        .dispatch("marketData/getMonthData", symbol)
        .then((monthData: TimeSeriesDaily) => {
          if (monthData) {
            const orderedDates: Array<string> = Object.keys(
              monthData["Time Series(Daily)"]
            ).sort(function(a: string, b: string) {
              a = a
                .split("/")
                .reverse()
                .join("");
              b = b
                .split("/")
                .reverse()
                .join("");
              return a > b ? 1 : a < b ? -1 : 0;
            });
            orderedDates.forEach(
              (date: string, index: number, dateArray: Array<string>) => {

                if (monthData["Time Series(Daily)"][date] != undefined) {
                  console.log("bruh");
                  dataCollection.datasets[0].data.push(
                    monthData["Time Series(Daily)"][date]["1. open"]
                  );
                  dataCollection.labels.push(date);
                  if (index === dateArray.length - 1) {
                    this.chartData = dataCollection;
                    this.loaded = true;
                  }
                }
              }
            );
          }
        });
    },
  },
  computed: { ...mapGetters({ allStocks: "marketData/allStockData" }) },
});
</script>
<style lang="sass" scoped></style>
