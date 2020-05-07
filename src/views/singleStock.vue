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
export default Vue.extend({
  name: "singleStock",
  components: {
    LineChart
  },
  // ? Might not render so use this just in case
  data() {
    return {
      loaded: false,
      testData: Object(),
      stockChartData: () => ({
        labels: Array(),
        datasets: Array()
      })
    };
  },
  methods: {
    renderStockChartData(chartData) {
      let dataCollection = {
        labels: [],
        datasets: [
          {
            // * Make the stock symbols dynamic
            label: this.$router.history.current.params.stockName,
            data: [],
            backgroundColor: ["rgb(255, 99, 132)"]
          }
        ]
      };
      Object.keys(chartData).forEach(stockDate => {
        dataCollection.datasets[0].data.push(chartData[stockDate]["4. close"]);
        dataCollection.labels.push(stockDate);
      });
      console.log(dataCollection);
      this.stockChartData = dataCollection;
    }
  },
  computed: {
    stockData() {
      console.log(this.$store.getters.getStocks);
      return this.$store.getters.getStocks;
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
    console.log("Router", this.$router.history.current.params.stockName);
    setTimeout(() => {
      this.testData = this.$store.getters.getTestData[0];
      this.renderStockChartData(this.testData);
      this.loaded = true;
    }, 1000);
    this.$store.dispatch(
      "getMonthData",
      this.$router.history.current.params.stockName
    );
  }
});
</script>
<style lang="sass" scoped>

</style>