<template>
  <div class="container-fluid">
    <div class="row">
      <stock-chart class="col-8" :stockData="chartData" />
      <div class="text-white col-md-auto" v-if="loaded === true">
        <div
          class="card"
          style="width: 18rem; background-color: #181a1b; border-color: grey"
        >
          <div class="card-body text-center">
            <h5 class="card-title">
              <!-- {{ stockData["Company Overview"]["Name"] }} -->
            </h5>
            <h6 class="card-subtitle mb-2 text-white">
              <!-- {{ stockData["Time Series(Daily)"][latestDate]["2. high"] }} -->
            </h6>
            <div v-if="portfolio.ownedStocks">
              <p
                class="card-text"
                v-if="portfolio.ownedStocks[symbol] !== undefined"
              >
                <!-- Shares: {{ portfolio.ownedStocks[symbol]["amountOwned"] }} -->
              </p>
            </div>
            <!-- ⬇ Move buying and selling functionality -->
            <button
              type="button"
              class="btn btn-primary card-link"
              @click="buyStock(stockData)"
            >
              Buy
            </button>
            <button
              type="button"
              class="btn btn-danger card-link"
              @click="sellStock(stockData)"
            >
              Sell
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col text-white" v-if="loaded === true">
        <!-- {{ stockData["Company Overview"]["Description"] }} -->
      </div>
    </div>
    <div
      class="btn-group"
      role="group"
      aria-label="Basic radio toggle button group"
    >
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
      <label
        class="btn btn-outline-primary"
        for="btnradio3"
        @click="chartDataFormat(12)"
        >1 Month</label
      >
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import StockChart from "../components/StockChart.vue";
import store from "@/store";
import { mapGetters } from "vuex";
export default Vue.extend({
  name: "singleStock",
  components: {
    StockChart,
  },
  data() {
    return {
      loaded: Boolean(),
      stockData: Object(),
      chartData: Object(),
      latestDate: String(),
      symbol: String(),
    };
  },
  mounted() {
    this.chartDataFormat(12);
  },
  watch: {
    monthData() {
      this.chartDataFormat(12);
    },
  },
  methods: {
    async chartDataFormat(days: number): Promise<void> {
      const symbol: string = this.$router.currentRoute.params.stockName;
      if (this.monthData[symbol] != undefined) {
        let dataCollection: DataCollection = {
          labels: [],
          datasets: [
            {
              name: symbol,
              data: [],
            },
          ],
        };
        const orderedDates: Array<string> = Object.keys(
          this.monthData[symbol]
        ).sort(function (a: string, b: string) {
          a = a.split("/").reverse().join("");
          b = b.split("/").reverse().join("");
          return a > b ? 1 : a < b ? -1 : 0;
        });
        console.log(this.monthData["AAPL"]);
        orderedDates.forEach(
          (date: string, index: number, dateArray: Array<string>) => {
            if (this.monthData[symbol]) {
              dataCollection.datasets[0].data.push(
                this.monthData[symbol][date]["4. close"]
              );
              console.log(date)
              dataCollection.labels.push(date);
              if (index === dateArray.length - 1) {
                this.latestDate = date;
                this.loaded = true;
                this.chartData = dataCollection;
              }
            }
          }
        );
        // await store
        //   .dispatch("marketData/getMonthData", name)
        //   .then((monthData: TimeSeriesDaily) => {
        //     if (monthData) {
        //     }
        //   });
      }
    },
    // buyStock(stock: any) {
    //   let portfolio: UserPortfolio = this.portfolio;
    //   if (
    //     portfolio.funds >
    //     Number(stock["Time Series(Daily)"][this.latestDate]["2. high"])
    //   ) {
    //     let boughtStockTransaction: newStockTransaction = {
    //       symbol: stock["Meta Data"]["2. Symbol"],
    //       data: {
    //         priceAtTransaction: Number(
    //           stock["Time Series(Daily)"][this.latestDate]["2. high"]
    //         ),
    //         amount: 1,
    //         time: new Date(),
    //       },
    //       name: stock["Company Overview"].Name,
    //     };
    //     store.dispatch("portfolio/buyStock", boughtStockTransaction);
    //   }
    // },
    // sellStock(stock: StockData) {
    //   let sellStockTransaction: newStockTransaction = {
    //     symbol: stock["Meta Data"]["2. Symbol"],
    //     data: {
    //       priceAtTransaction: Number(
    //         stock["Time Series(Daily)"][this.latestDate]["2. high"]
    //       ),
    //       amount: 1,
    //       time: new Date(),
    //     },
    //     name: stock["Company Overview"].Name,
    //   };
    //   store.dispatch("portfolio/sellStock", sellStockTransaction);
    // },
  },
  computed: {
    ...mapGetters({ monthData: "marketData/monthData" }),
    ...mapGetters({ portfolio: "portfolio/portfolio" }),
  },
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
