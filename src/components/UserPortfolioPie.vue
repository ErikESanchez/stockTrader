<template>
  <div>
    <apexcharts :series="series" :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";
export default Vue.extend({
  components: {
    apexcharts: VueApexCharts,
  },
  props: ["portfolio"],
  data() {
    return {
      series: [] as Array<number>,
      chartOptions: {
        plotOptions: {
          pie: {
            donut: {
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
  watch: {
    portfolio(): void {
      console.log(this.portfolio);
    },
  },
});
</script>

<style></style>
