<template>
  <div>
    <h1>Load the real data for a single stock</h1>
    <line-chart
      v-if="loaded == true"
      :chartData="stockChartData"
      :options="chartOptions"
      style="height: 300px;"
    ></line-chart>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import LineChart from "../components/LineChart.vue";
import store from "@/store";
import { Chart, chartData } from "@/Classes/Chart";
export default Vue.extend({
  name: "singleStock",
  components: {
    LineChart,
  },
  data() {
    return {
      chart: new Chart(),
      loaded: false,
      stockChartData: (): Object => ({
        labels: Array(),
        datasets: Array(),
      }),
    };
  },
  methods: {
    dayChart(): void {
      let chart: Chart = this.chart;
      let symbol: string = this.$router.currentRoute.params.stockName;
      Promise.resolve(
        store.dispatch("getApiIntraday", symbol).then((dayData: any) => {
          if (dayData) {
            let metaData: any = dayData["data"]["Meta Data"];
            let priceData: any = dayData["data"]["Time Series (1min)"];
            console.log(metaData, priceData);
            // Todo: I have to figure out a way to store the data in a reasonable manner, or get better at calling the api.
            Promise.resolve(
              chart
                .renderChart(priceData, symbol)
                .then((dataCollections: any) => {
                  console.log("Data Collection", dataCollections);
                  this.stockChartData = dataCollections;
                })
            );
          } else {
            console.log("Data did not reach chart");
          }
        })
      );
    },
    monthChart(): void {
      let chart: Chart = this.chart;
      let symbol: string = this.$router.currentRoute.params.stockName;
      Promise.resolve(store.dispatch("getMonthData", symbol)).then(
        (monthData: Object) => {
          if (monthData) {
            // ? It would probably be better to use a prop and pass it down from the parent component
            let data: any = store.getters.getMonthData;
            console.log(data);
            Promise.resolve(chart.renderChart(data, symbol)).then(
              (dataCollections: any) => {
                console.log(dataCollections);
                this.stockChartData = dataCollections;
              }
            );
          }
        }
      );
      this.loaded = true;
    },
  },
  computed: {
    stockData() {
      return store.getters.getStocks;
    },
    chartOptions(): any {
      return {
        responsive: true,
        // Keep it false so it stays as a rectangle
        maintainAspectRatio: false,
      };
    },
  },
  async mounted() {
    // this.monthChart();
    this.monthChart();
  },
});
</script>
<style lang="sass" scoped></style>
