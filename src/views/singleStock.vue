<template>
  <div>
    <stock-chart :stockData="chartData" class="container-fluid" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import StockChart from "../components/StockChart.vue";
import store from "@/store";
import { MonthData } from "@/storeModules/marketData";
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
        .then((monthData: MonthData) => {
          if (monthData) {
            Object.keys(monthData).forEach(
              (date: string, index: number, dateArray: Array<string>) => {
                dataCollection.datasets[0].data.push(
                  monthData[date]["1. open"]
                );
                dataCollection.labels.push(date);
                if (index === dateArray.length - 1) {
                  this.chartData = dataCollection;
                  this.loaded = true;
                }
              }
            );
          }
        });
    },
  },
  computed: {
    // chartOptions(): ChartOptions {
    //   return {
    //     responsive: true,
    //     // Keep it false so it stays as a rectangle
    //     maintainAspectRatio: false,
    //   };
    // },
  },
  async mounted() {
    this.monthChart();
  },
});
</script>
<style lang="sass" scoped></style>
