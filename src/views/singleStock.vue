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
import store from "@/store";
import { Chart } from "@/Classes/Chart";
export default Vue.extend({
  name: "singleStock",
  components: {
    LineChart
  },
  data() {
    return {
      loaded: false,
      stockChartData: (): Object => ({
        labels: Array(),
        datasets: Array()
      })
    };
  },
  methods: {
    // renderStockChartData(chartData: Object) {
    //   let dataCollection = {
    //     labels: [],
    //     datasets: [
    //       {
    //         // * Make the stock symbols dynamic
    //         label: router.history.current.params.stockName,
    //         data: [],
    //         backgroundColor: ["rgb(255, 99, 132)"]
    //       }
    //     ]
    //   };
    //   Object.keys(chartData).forEach((stockDate: string) => {
    //     dataCollection.datasets[0].data.push(chartData[stockDate]["4. close"]);
    //     dataCollection.labels.push(stockDate);
    //   });
    //   console.log(dataCollection);
    //   this.stockChartData = dataCollection;
    // }
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
    let chart: Chart = new Chart();
    let symbol: string = this.$router.currentRoute.params.stockName;
    Promise.resolve(
      store.dispatch("getMonthData", this.$router.currentRoute.params.stockName)
    ).then((res: any) => {
      if (res === true) {
        // ? It would probably be better to use a prop and pass it down from the parent component
        let data: any = store.getters.getMonthData;
        console.log(data);
        Promise.resolve(chart.renderChart(data, symbol)).then(
          (dataCollections: any) => {
            console.log(dataCollections);
            console.log("dataCollections", dataCollections);
            this.stockChartData = dataCollections;
          }
        );
      }
    });

    this.loaded = true;
  }
});
</script>
<style lang="sass" scoped></style>
