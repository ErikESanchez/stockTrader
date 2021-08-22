<template>
  <div>
    <apexchart class="col" :series="series" :options="chartOptions" width="100%" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";
import moment from "moment";
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
            show: Boolean(),
            style: {
              colors: [] as Array<string>,
            },
            format: String()
            // datetimeFormatter: {
            //   year: String(),
            //   month: String(),
            //   day: String(),
            //   hour: String(),
            // },
          },
          crosshairs: {
            show: Boolean(),
          },
          tooltip: {
            enabled: Boolean(),
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: [] as Array<string>,
            },
          },
          crosshairs: {
            show: Boolean(),
          },
          tooltip: {
            enabled: Boolean(),
          },
        },
        grid: {
          show: Boolean(),
        },
        tooltip: {
          // enabled: Boolean(),
          // shared: Boolean(),
          // followCursor: Boolean(),
          x: {
            format: String()
          }
        },
      },
    };
  },
  watch: {
    stockData(): void {
      this.series[0] = this.stockData.datasets[0];
      let colorArray: Array<string> = [];
      for (let i = 0; i < this.stockData.labels.length; i++) {
        this.stockData.labels[i] = moment(this.stockData.labels[i]).format(
          "MMM DD"
        );
        colorArray.push("white");
      }
      this.chartOptions = {
        chart: {
          height: 350,
          type: "line",
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
            show: true,
            style: {
              colors: colorArray as Array<string>,
            },
            format: 'MMM DD'
            // ? May not need to loop the dates and instead need this
            // datetimeFormatter: {
            //   year: "yyyy MM",
            //   month: "MMM dd",
            //   day: "dd",
            //   hour: "HH:mm",
            // },
          },
          crosshairs: {
            show: true,
          },
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: colorArray as Array<string>,
            },
          },
          crosshairs: {
            show: true,
          },
          tooltip: {
            enabled: false,
          },
        },
      
        grid: {
          show: false,
        },
        tooltip: {
          // enabled: true,
          // shared: false,
          // followCursor: true,
          x: {
            format: 'dd MMM'
          }
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
