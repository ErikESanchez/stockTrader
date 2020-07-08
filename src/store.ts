import Vue from "vue";
import Vuex from "vuex";
import marketData from "./storeModules/marketData";
import userModule from "./storeModules/userModule";
import portfolio from "./storeModules/portfolio";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    marketData,
    userModule,
    portfolio,
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

export interface userStock {
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

export let storeSchema = {
  mutations: {
    buyNewStock: "buyNewStock",
    buyMoreStock: "buyMoreStock",
  },
};
