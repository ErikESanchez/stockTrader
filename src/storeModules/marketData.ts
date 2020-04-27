import { ActionTree } from "vuex";
import { GetterTree } from "vuex";
import { MutationTree } from "vuex";
import apikey from "../apikey"
import { db } from "../firebase"
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

export const actions: ActionTree<any, any> = {
  async getApiData({ dispatch }, stock) {
    let payloadFormat: TIME_SERIES_DAILY = {
      function: "TIME_SERIES_DAILY",
      symbol: stock,
      interval: "30min",
      apikey: apikey.state.apikey,
      outputsize: "compact"
    };
    let stocksRef = db.collection("stocks")
    await dispatch("getStockQuote", payloadFormat).then(res => {
      let symbol = res.data["Meta Data"]["2. Symbol"]
      stocksRef.doc(symbol).set({
        data: res.data
      }).then(function (symbol) {
        console.log("Document is under ID: ", symbol);
      }).catch(function (error) {
        console.error("Error adding document", error);
      })
    })
  },

  async getDatabaseStockData() {
    // Todo: Dynamically get stocks from the database using the named stocks
    let docRef = db.collection("stocks").doc("38itB8rfPI1zmPOCa719")
    docRef.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document Data: ", doc.data())
      } else {
        console.log("Document doesn't exist!")
      }
    }).catch(function (error) {
      console.error("Error getting document", error)
    });
  },

  async getStockQuote({ commit }, payload: TIME_SERIES_DAILY) {
    commit("addDataToStock", payload);
    return await axios.get(marketDataUrl, {
      params: {
        function: payload.function,
        symbol: payload.symbol,
        interval: payload.interval,
        apikey: payload.apikey,
        outputsize: payload.outputsize
      }
    });
  }
};

export interface TIME_SERIES_DAILY {
  function: "TIME_SERIES_DAILY";
  symbol: string;
  interval: string;
  apikey: string;
  outputsize?: string;
}

export default {
  actions,
  mutations,
  getters,
  state
};
