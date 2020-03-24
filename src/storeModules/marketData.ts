import { ActionTree } from "vuex";
import { GetterTree } from "vuex";
import { MutationTree } from "vuex";
import { apikey } from "@/apiKey"; // apikey must be lower case
import axios from "axios";
const marketDataUrl = "https://www.alphavantage.co/query";

const state = {
  testStockData: []
};
const getters: GetterTree<any, any> = {};
const mutations: MutationTree<any> = {
  addDataToStock(state, newStock) {
    state.testStockData.push(newStock);
  }
};
const actions: ActionTree<any, any> = {
  async getStockQuote({ commit }, payload: TIME_SERIES_DAILY) {
    commit("addDataToStock", payload);
    return await axios.get(marketDataUrl, {
      params: {
        function: payload.function,
        symbol: payload.symbol,
        apikey
      }
    });
  }
};

export interface TIME_SERIES_DAILY {
  function: "TIME_SERIES_DAILY";
  symbol: string;
}

export default {
  actions,
  mutations,
  getters,
  state
};
