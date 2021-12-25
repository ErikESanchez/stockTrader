<template>
  <div>
    <apexcharts :series="series" :options="chartOptions" height="200px"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";
export default Vue.extend({
  components: {
    apexcharts: VueApexCharts,
  },
  props: ["portfolioStockData"],
  data() {
    return {
      series: [] as Array<number>,
      chartOptions: {
        plotOptions: {
          pie: {
            labels: {
              show: true,
              name: {
                show: true,
                color: "white",
              },
              value: {
                show: true,
                color: "white",
              },
              total: {
                show: true,
                label: "Total Hours",
                color: "white",
              },
            },
          },
        },
        chart: {
          type: "donut",
        },
        labels: [] as Array<string>,
        legend: {
          show: true,
          labels: {
            useSeriesColors: true,
          },
        },
        responsive: [
          {
            breakpoint: "100%",
            options: {
              chart: {
                width: 100,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    // Todo: Add values to the series array in data 'this.series'
    renderPortfolioData(ownedStocks: portfolioStock) {
      for (let symbol in ownedStocks){
        this.series.push(ownedStocks[symbol].owned)
        this.chartOptions.labels.push(symbol)
      }
    },
  },
  watch: {
    portfolioStockData: {
      handler(val: portfolioStock) {
        this.renderPortfolioData(val);
      },
      // ! 'immediate' value needs to be true
      immediate: true,
    },
  },
});

interface portfolioStock {
  [symbol: string]: {
    owned: number;
    symbol: string;
  };
}
</script>

<style></style>
