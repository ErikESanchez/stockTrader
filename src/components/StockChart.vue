<template>
  <div>
    <apexchart :series="series" :options="chartOptions" width="99%" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";
export default Vue.extend({
  components: {
    apexchart: VueApexCharts,
  },
  props: ["stockData"],
  data() {
    return {
      series: [] as Array<Series>,
      chartOptions: {
        chart: {
          height: Number(),
          type: String(),
        },
        colors: [] as Array<string>,
        dataLabels: {
          enabled: Boolean(),
        },
        stroke: {
          curve: String(),
        },
        xaxis: {
          type: String(),
          categories: [] as Array<string>,
          labels: {
            style: {
              colors: [] as Array<string>,
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: [] as Array<string>,
            },
          },
        },
        grid: {
          show: Boolean(),
        },
      },
    };
  },
  watch: {
    stockData(): void {
      this.series.push(this.stockData.datasets[0]);
      let colorArray: Array<string> = [];
      this.stockData.labels.forEach((date: string) => {
        colorArray.push("white");
      });
      this.chartOptions = {
        chart: {
          height: 350,
          type: "area",
        },
        colors: ["#E91E63"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: this.stockData.labels as Array<string>,
          labels: {
            style: {
              colors: colorArray as Array<string>,
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: colorArray as Array<string>,
            },
          },
        },
        grid: {
          show: false,
        },
      };
    },
  },
});

interface Series {
  name: string;
  data: Array<number>;
}
</script>

<style></style>
