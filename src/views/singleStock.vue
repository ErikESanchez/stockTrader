<template>
  <div class="container-fluid">
    <stock-chart :stockData="chartData" />
    <div
      class="btn-group"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        id="btnradio1"
        autocomplete="off"
        checked
      />
      <label class="btn btn-outline-primary" for="btnradio1"></label>

      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        id="btnradio2"
        autocomplete="off"
      />
      <label
        class="btn btn-outline-primary"
        for="btnradio2"
        @click="chartDataFormat(25)"
        >1 Week</label
      >

      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        id="btnradio3"
        autocomplete="off"
      />
      <label class="btn btn-outline-primary" for="btnradio3" @click="chartDataFormat(12)">1 Month</label>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import StockChart from "../components/StockChart.vue";
import store from "@/store";
import { MonthData, TimeSeriesDaily } from "@/storeModules/marketData";
import { mapGetters } from "vuex";
// import { ChartData, ChartOptions } from "@/components/LineChart.vue";
export default Vue.extend({
  name: "singleStock",
  components: {
    StockChart,
  },
  props: ["stockData"],
  data() {
    return {
      loaded: Boolean(),
      chartData: Object(),
    };
  },
  mounted() {
    this.chartDataFormat(12);
  },
  watch: {
    allStocks() {
      this.chartDataFormat(12);
    },
  },
  methods: {
    async chartDataFormat(days: number): Promise<void> {
      const symbol: string = this.$router.currentRoute.params.stockName;
      let dataCollection: DataCollection = {
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
                if (
                  monthData["Time Series(Daily)"][date] != undefined &&
                  index > days
                ) {
                  dataCollection.datasets[0].data.push(
                    monthData["Time Series(Daily)"][date]["4. close"]
                  );
                  dataCollection.labels.push(date);
                  if (index === dateArray.length - 1) {
                    console.log(this.chartData);
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

interface DataCollection {
  labels: Array<string>;
  datasets: [
    {
      name: string;
      data: Array<string>;
    }
  ];
}
</script>
<style lang="sass" scoped></style>
