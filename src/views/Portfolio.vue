<template>
  <div>
    <div class="container" v-if="loaded === true">
      <div class="row">
        <portfolio-stock-card
          class="col-sm"
          v-for="(stock, index) in stocks"
          :stock="stock"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PortfolioStockCard from "@/components/PortfolioStockCard.vue";
import { mapGetters } from "vuex";
import store from "@/store";
import {
  FormatedStock,
  StockData,
  stockDataFormat,
} from "@/storeModules/marketData";
import portfolio, { UserPortfolio } from "@/storeModules/portfolio";
export default Vue.extend({
  name: "portfolio",
  components: {
    PortfolioStockCard,
  },
  data() {
    return {
      ownedAndMarketStocks: {} as OwnedAndMarketStocks,
      loaded: Boolean(),
      stocks: Object(),
    };
  },
  mounted() {
    console.log(Object.keys((this as any).allStockData)[0]);
    (this as any).ownedAndMarketStocks.formatedStock =
      store.getters["marketData/allStockData"];
    (this as any).ownedAndMarketStocks.portfolio =
      store.getters["portfolio/portfolio"];
    let ownedAndMarketStocks: OwnedAndMarketStocks = {
      portfolio: this.portfolio as UserPortfolio,
      allStockData: this.allStockData as IndividualStockData,
    };
    (this as any).sortStockAndPortfolioData(ownedAndMarketStocks);

    // if (Object.keys((this as any).allStockData)[0] != undefined) {
    //   (this as any).sortStockAndPortfolioData(ownedAndMarketStocks);
    // }
  },
  methods: {
    sortStockAndPortfolioData(ownedAndMarketStocks: OwnedAndMarketStocks) {
      let portfolio: UserPortfolio = (this as any).ownedAndMarketStocks
        .portfolio;
      Object.keys(portfolio.ownedStocks).forEach(
        (symbol: string, index: number, symbolArray: Array<string>) => {
          let name: string = portfolio.ownedStocks[symbol].name;
          // console.log(ownedAndMarketStocks.allStockData[name]);
          if (portfolio.ownedStocks[symbol].amountOwned >= 1) {
            (this as any).stocks[symbol] = {
              portfolio: portfolio.ownedStocks[symbol],
              allStockData: ownedAndMarketStocks.allStockData[name],
            };
          }
          if (symbolArray.length - 1 === index) {
            (this as any).loaded = true;
          }
        }
      );
      // (this as any).ownedAndMarketStocks.formatedStock.forEach(
      //   (
      //     stockData: stockDataFormat,
      //     index: number,
      //     stockDataArray: Array<stockDataFormat>
      //   ): void => {
      //     let symbol: string = stockData.stockData.symbol;
      //     let portfolio = (this as any).ownedAndMarketStocks.portfolio;
      //     // * Also need to make logic for dataTranasctions to be saved to watch growth or decline in userWealth
      //     // ! I think it has to do with the buying and selling feature inside the individual stock
      //     // * Look into making a more expansive list of stocks for calling with the database maybe a 2 or three minute delay between api calls
      //     // * There should only be a 5 per minute limit
      //   }
      // );
    },
    // },
    // watch: {
    //   portfolio(newVal) {
    //     (this as any).ownedAndMarketStocks.portfolio = newVal;
    //     console.log("bruh2");
    //     if ((this as any).ownedAndMarketStocks.formatedStock != undefined) {
    //       (this as any).ownedAndMarketStocks.formatedStock = this.allStockData;
    //       (this as any).ownedAndMarketStocks.portfolio = this.portfolio;
    //       let ownedAndMarketStocks: OwnedAndMarketStocks = {
    //         portfolio: this.portfolio as UserPortfolio,
    //         allStockData: this.allStockData as IndividualStockData,
    //       };
    //       (this as any).sortStockAndPortfolioData(ownedAndMarketStocks);
    //     }
    //   },
    //   allStockData(newVal) {
    //     (this as any).ownedAndMarketStocks.allStockData = newVal;
    //     console.log("bruh3");
    //     if ((this as any).ownedAndMarketStocks.portfolio != undefined) {
    //       (this as any).ownedAndMarketStocks.portfolio = this.portfolio;
    //       let ownedAndMarketStocks: OwnedAndMarketStocks = {
    //         portfolio: this.portfolio as UserPortfolio,
    //         allStockData: this.allStockData as IndividualStockData,
    //       };
    //       (this as any).sortStockAndPortfolioData(ownedAndMarketStocks);
    //       // ? Maybe these are affecting the render
    //     }
    //   },
  },

  computed: {
    ...mapGetters({
      portfolio: "portfolio/portfolio",
      allStockData: "marketData/allStockData",
    }),
  },
});

export interface OwnedAndMarketStocks {
  allStockData: IndividualStockData;
  portfolio: UserPortfolio;
}

export interface SingleOwnedMarketAndStocks {
  allStockData: StockData;
  portfolio: UserPortfolio;
}

interface IndividualStockData {
  [name: string]: StockData;
}
</script>

<style></style>
