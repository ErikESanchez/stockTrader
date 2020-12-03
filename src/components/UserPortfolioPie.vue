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
  props: ["portfolioChart"],
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
            breakpoint: 480,
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
    renderPortfolioData(portfolio: portfolioStock) {
      for (let stock in portfolio){
        this.series.push(portfolio[stock].amountOwned)
        this.chartOptions.labels.push(portfolio[stock].symbol)
      }
    },
  },
  watch: {
    portfolioChart: {
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
    amountOwned: number;
    symbol: string;
  };
}
</script>

<style></style>
