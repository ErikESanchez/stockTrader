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
import { any } from "async";
import router from "vue-router";
import store from "@/store";
export default Vue.extend({
  name: "singleStock",
  components: {
    LineChart
  },
  data() {
    return {
      loaded: false,
      testData: Object(),
      // Todo: I guess make an interface
      stockChartData: (): Object => ({
        labels: Array(),
        datasets: Array()
      })
    };
  },
  methods: {
    renderStockChartData(chartData: Object) {
      let dataCollection = {
        labels: [],
        datasets: [
          {
            // * Make the stock symbols dynamic
            label: router.history.current.params.stockName,
            data: [],
            backgroundColor: ["rgb(255, 99, 132)"]
          }
        ]
      };
      Object.keys(chartData).forEach((stockDate: string) => {
        dataCollection.datasets[0].data.push(chartData[stockDate]["4. close"]);
        dataCollection.labels.push(stockDate);
      });
      console.log(dataCollection);
      this.stockChartData = dataCollection;
    }
  },
  computed: {
    stockData() {
      console.log(store.getters.getStocks);
      return store.getters.getStocks;
    },
    chartOptions(): any {
      return {
        responsive: true,
        // Keep it false so it stays as a rectangle
        maintainAspectRatio: false
      };
    }
  },
  async mounted() {
    console.log("Router", router.history.current.params.stockName);
    setTimeout(() => {
      this.testData = store.getters.getTestData[0];
      this.renderStockChartData(this.testData);
      this.loaded = true;
    }, 1000);
    store.dispatch("getMonthData", router.history.current.params.stockName);
  }
});
</script>
<style lang="sass" scoped></style>
