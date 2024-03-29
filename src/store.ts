import Vue from "vue";
import Vuex from "vuex";
import marketData from "./storeModules/marketData";
import userModule from "./storeModules/userModule";
import portfolio from "./storeModules/portfolio";
// import userPublicData from "./storeModules/userPublicData"
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    marketData,
    userModule,
    portfolio,
    // userPublicData
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
});

export interface stockTransactionData {
  priceAtTransaction: number;
  amount: number;
  time: Date;
}

export interface UserStock {
  name: string;
  stocksOwned: Array<stockTransactionData>;
}
export interface userPriceHistory {
  funds: number;
  time: Date;
}

export interface apiStockData {
  name: string;
}

